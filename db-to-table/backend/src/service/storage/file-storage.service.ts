import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ItemBucketMetadata } from 'minio';
import * as path from 'path';
import { Readable } from 'stream';

@Injectable()
export class FileStorageService {
  constructor(private readonly configService: ConfigService) {}
  logger = new Logger(FileStorageService.name);

  async upload(payload: {
    bucketName?: string;
    objectName: string;
    stream: Readable;
    size?: number;
    contentType: string;
    metadata?: ItemBucketMetadata;
  }) {
    return new Promise<void>((resolve, reject) => {
      const writableStream = fs.createWriteStream(
        path.join(
          this.configService.get('localStorage.directory'),
          payload.objectName,
        ),
      );
      payload.stream.pipe(writableStream);
      writableStream.on('finish', () => {
        console.log('File saved successfully.');
        resolve();
      });

      // Handle errors during the piping process
      writableStream.on('error', (err) => {
        console.error('Error writing to file:', err);
        reject(err);
      });

      // Handle errors in the readable stream
      payload.stream.on('error', (err) => {
        console.error('Error reading from stream:', err);
        reject(err);
      });
    });
  }
  async download(payload: { bucketName?: string; objectName: string }) {
    return await fs.createReadStream(
      path.join(
        this.configService.get('localStorage.directory'),
        payload.objectName,
      ),
    );
  }
}
