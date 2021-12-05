import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as env from 'env-var';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import './dotenv';
import * as path from 'path';

// If running tests, an in-memory SQLite database will be used instead
// of the configured one. NODE_ENV=test is set by Jest.
const isTestRun = env.get('NODE_ENV').asString() === 'test';

const entities = [path.join('dist', '**', '*.entity.{js,ts}')];
const migrationsDir = path.join('src', 'database', 'migrations');
const migrations = [path.join('dist', 'database', 'migrations', '*.{js,ts}')];

const config = {
  host: env.get('DB_HOST').default('').asString(),
  port: env.get('DB_PORT').default(0).asIntPositive(),
  username: env.get('DB_USERNAME').default('').asString(),
  password: env.get('DB_PASSWORD').default('').asString(),
  database: env.get('DB_DATABASE').default('').asString(),
};

const mysql: MysqlConnectionOptions = {
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities,
  cli: {
    migrationsDir,
  },
  migrations,
  // migrationsRun: true,
  synchronize: false,
  // dropSchema: true,
};

const sqlite: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  // entities,
  cli: {
    migrationsDir,
  },
  migrations,
  // Drop existing tables and migrate entities associated to the
  // connection during its setup. dropSchema is used since the
  // connection will be reused in all tests in the same suite
  // (keepConnectionAlive = true) in TypeOrmModule config.
  synchronize: true,
  dropSchema: true,
};

// During testing, override database config with in-memory SQLite,
// and auto-migrate entities.
const ormConfig: TypeOrmModuleOptions = isTestRun ? sqlite : mysql;

export = ormConfig;
