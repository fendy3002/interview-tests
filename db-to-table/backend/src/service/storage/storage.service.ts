import { ConfigService } from '@nestjs/config';
import { Client, ItemBucketMetadata } from 'minio';
import { Readable } from 'stream';

export class StorageService {
  constructor(private readonly configService: ConfigService) {}
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
    return await this.minioClient().putObject(
      payload.bucketName ?? this.configService.get('minio.bucketName'),
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
    return await this.minioClient().getObject(
      payload.bucketName ?? this.configService.get('minio.bucketName'),
      payload.objectName,
    );
  }
}
