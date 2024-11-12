import * as fs from 'fs';
import * as path from 'path';
import { CsvFileParserService } from './csv-file-parser.service';

describe('csv-file-parser.service', () => {
  let service: CsvFileParserService;
  beforeAll(async () => {
    service = new CsvFileParserService();
  });

  describe('parseCsvFromReadable', () => {
    it(`will read data.csv and return result`, async () => {
      const expectedHeaders = [
        'first_name',
        'last_name',
        'email',
        'gender',
        'ip_address',
        'date',
      ];
      const readStream = fs.createReadStream(path.join(__dirname, 'data.csv'));
      const result = await service.parseCsvFromReadable(readStream);
      expect(result.headers).toEqual(expectedHeaders);
      expect(result.rows.length).toBeGreaterThan(1000);
    });
  });
  describe('parseCsvFromReadableRanged', () => {
    it('will return data from 1 to 50', async () => {
      const expectedHeaders = [
        'first_name',
        'last_name',
        'email',
        'gender',
        'ip_address',
        'date',
      ];
      const readStream = fs.createReadStream(path.join(__dirname, 'data.csv'));
      const result = await service.parseCsvFromReadableRanged(readStream, {
        from: 0,
        to: 50,
      });
      expect(result.headers).toEqual(expectedHeaders);
      expect(result.rows.length).toBeLessThan(60);
    });
    it('will return data from 100 to 250', async () => {
      const expectedHeaders = [
        'first_name',
        'last_name',
        'email',
        'gender',
        'ip_address',
        'date',
      ];
      const readStream = fs.createReadStream(path.join(__dirname, 'data.csv'));
      const result = await service.parseCsvFromReadableRanged(readStream, {
        from: 101,
        to: 250,
      });
      expect(result.headers).toEqual(expectedHeaders);
      expect(result.rows.length).toBe(150);
      expect(result.rows[0].first_name).toBe('Addie');
      expect(result.rows[result.rows.length - 1].first_name).toBe('Nat');
    });
  });
});
