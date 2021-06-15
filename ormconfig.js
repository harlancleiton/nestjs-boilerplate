const { resolve } = require('path');

const isTestMode = process.env.NODE_ENV === 'test';
const isProductionMode = process.env.NODE_ENV === 'production';

const entities = [];
const migrations = [];

if (isProductionMode) {
  const entitiesPath = resolve(
    __dirname,
    'dist',
    '**',
    'infra',
    'typeorm',
    'entities',
    '*.entity.js'
  );

  entities.push(entitiesPath);

  const migrationsPath = resolve(
    __dirname,
    'dist',
    'shared',
    'infra',
    'database',
    'typeorm',
    'migrations',
    '*.js'
  );

  migrations.push(migrationsPath);
} else {
  const entitiesPath = resolve(
    __dirname,
    'src',
    '**',
    'infra',
    'typeorm',
    'entities',
    '*.entity.ts'
  );

  entities.push(entitiesPath);

  const migrationsPath = resolve(
    __dirname,
    'src',
    'shared',
    'infra',
    'database',
    'typeorm',
    'migrations',
    '*.ts'
  );

  migrations.push(migrationsPath);
}

module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsRun: isTestMode,
  dropSchema: isTestMode,
  entities,
  migrations,
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/shared/infra/database/typeorm/migrations'
  }
};
