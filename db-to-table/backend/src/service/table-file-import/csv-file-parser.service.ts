import { Injectable } from '@nestjs/common';
import { parse as parserCsv } from 'csv-parse';
import { Readable } from 'stream';

@Injectable()
export class CsvFileParserService {
  async parseCsvFromReadable(readable: Readable) {
    const parser = parserCsv({
      escape: '"',
      columns: true,
    });
    const parsedCsvRows = await new Promise<any[]>((resolve, reject) => {
      const rows: any[] = [];
      readable
        .pipe(parser)
        .on('data', (row: any) => {
          rows.push(row);
        })
        .on('end', () => {
          resolve(rows);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
    return {
      rows: parsedCsvRows,
      headers: Object.keys(parsedCsvRows[0]),
    };
  }

  async parseCsvFromReadableRanged(
    readable: Readable,
    range: { from: number; to: number },
  ) {
    const parser = parserCsv({
      escape: '"',
      columns: true,
    });
    let rowNumber = 1;
    const parsedCsvRows = await new Promise<any[]>((resolve, reject) => {
      let hasResolved = false;
      const rows: any[] = [];
      const parserStream = readable
        .pipe(parser)
        .on('end', () => {
          if (!hasResolved) {
            hasResolved = true;
            resolve(rows);
          }
        })
        .on('data', (row: any) => {
          if (rowNumber >= range.from) {
            rows.push(row);
          }
          rowNumber++;
          if (rowNumber > range.to) {
            parserStream.destroy();
            return;
          }
        })
        .on('close', () => {
          if (!hasResolved) {
            resolve(rows);
            hasResolved = true;
          }
        })
        .on('error', (err) => {
          reject(err);
        });
    });
    return {
      rows: parsedCsvRows,
      headers: Object.keys(parsedCsvRows[0] ?? {}),
    };
  }
}
