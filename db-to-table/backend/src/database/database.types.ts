export type Database = {
  type: 'better-sqlite3' | 'postgres';
  database?: string;
  host?: string;
  port?: number;
  name?: string;
  username?: string;
  password?: string;
};
