import { Readable } from 'stream';

export const bufferToReadable = (buffer: Buffer) => {
  const stream = new Readable({
    read() {
      this.push(buffer); // Push the buffer data into the stream
      this.push(null); // Push `null` to indicate the end of the stream
    },
  });

  return stream;
};
