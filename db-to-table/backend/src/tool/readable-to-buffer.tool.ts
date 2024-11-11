import { Readable } from 'stream';

// can be on common library if want
export const ReadableToBuffer = (readable: Readable) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    readable.on('data', (chunk) => {
      chunks.push(chunk);
    });

    readable.on('end', () => {
      resolve(Buffer.concat(chunks)); // Concatenate all chunks and resolve the buffer
    });

    readable.on('error', (err) => {
      reject(err); // Handle any errors
    });
  });
};
