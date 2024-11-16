import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ItemBucketMetadata } from 'minio';
import { Readable } from 'stream';
import { FileStorageService } from './file-storage.service';

@Injectable()
export class StorageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileStorageService: FileStorageService,
  ) {}
  minioClient() {
    return new Client(this.configService.get('minio'));
  }
  async upload(payload: {
    bucketName?: string;
    objectName: string;
    stream: Readable;
    size?: number;
    contentType: string;
    metadata?: ItemBucketMetadata;
  }) {
    if (this.configService.get('storage.mode') === 'local') {
      return await this.fileStorageService.upload(payload);
    }
    const bucketName =
      payload.bucketName ?? this.configService.get('minio.bucketName');
    if (!(await this.minioClient().bucketExists(bucketName))) {
      await this.minioClient().makeBucket(bucketName);
    }
    return await this.minioClient().putObject(
      bucketName,
      payload.objectName,
      payload.stream,
      payload.size,
      {
        'Content-Type': payload.contentType,
        ...(payload.metadata ?? {}),
      },
    );
  }
  async download(payload: { bucketName?: string; objectName: string }) {
    if (this.configService.get('storage.mode') === 'local') {
      return await this.fileStorageService.download(payload);
    }
    return await this.minioClient().getObject(
      payload.bucketName ?? this.configService.get('minio.bucketName'),
      payload.objectName,
    );
  }
}
