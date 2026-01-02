import knex from 'knex';
import knexConfig from '../database.config.js';

const environment = process.env.NODE_ENV || 'development';

// Force IPv4 for Docker containers
if (process.env.NODE_ENV !== 'production' && knexConfig[environment].connection) {
  if (typeof knexConfig[environment].connection === 'string') {
    // Add sslmode=require for Supabase connections
    knexConfig[environment].connection += '?sslmode=require';
  } else if (typeof knexConfig[environment].connection === 'object') {
    knexConfig[environment].connection.ssl = { rejectUnauthorized: false };
  }
}

const db = knex(knexConfig[environment]);

export default db;