import { Test, TestingModule } from '@nestjs/testing';
import { TestModule } from 'src/test.module';
import { TableFileImportService } from './table-file-import.service';
import { EntityManager } from 'typeorm';

describe('table-file-import.service.spec', () => {
  let app: TestingModule;
  let tableFileImportService: TableFileImportService;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    tableFileImportService = app.get(TableFileImportService);
  });

  describe('getAvalableTableName', () => {
    it(`will get tableName without problem`, async () => {
      const em = {
        query: jest.fn(),
      };
      em.query.mockResolvedValue([]);
      const initialTableName = 'mytable';
      const expectedTableName = 'mytable';
      const actualTableName = await tableFileImportService.getAvalableTableName(
        em as any,
        initialTableName,
      );
      expect(expectedTableName).toBe(actualTableName);
    });
    it(`will get tableName with suffix`, async () => {
      const em = {
        query: jest.fn(),
      };
      const initialTableName = 'mytable';
      em.query.mockResolvedValueOnce([{ table_name: initialTableName }]);
      em.query.mockResolvedValueOnce([{ table_name: initialTableName + '_1' }]);
      em.query.mockResolvedValueOnce([{ table_name: initialTableName + '_2' }]);
      em.query.mockResolvedValueOnce([]);

      const expectedTableName = 'mytable_3';
      const actualTableName = await tableFileImportService.getAvalableTableName(
        em as any,
        initialTableName,
      );
      expect(expectedTableName).toBe(actualTableName);
    });
  });
});
