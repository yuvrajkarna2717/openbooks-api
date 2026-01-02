import knex from 'knex';
import knexConfig from '../database.config.js';

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

export default db;