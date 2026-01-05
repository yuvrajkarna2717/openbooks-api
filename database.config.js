import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.SUPABASE_DB_URL,
      ssl: { rejectUnauthorized: false },
      // Force IPv4 in Docker and CI
      host: process.env.SUPABASE_DB_URL ? new URL(process.env.SUPABASE_DB_URL).hostname : 'localhost'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      connectionString: process.env.SUPABASE_DB_URL + '?family=4',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.SUPABASE_DB_URL ? new URL(process.env.SUPABASE_DB_URL).hostname : 'localhost',
      port: process.env.SUPABASE_DB_URL ? new URL(process.env.SUPABASE_DB_URL).port : 5432,
      user: process.env.SUPABASE_DB_URL ? decodeURIComponent(new URL(process.env.SUPABASE_DB_URL).username) : 'postgres',
      password: process.env.SUPABASE_DB_URL ? decodeURIComponent(new URL(process.env.SUPABASE_DB_URL).password) : '',
      database: process.env.SUPABASE_DB_URL ? new URL(process.env.SUPABASE_DB_URL).pathname.slice(1) : 'postgres',
      ssl: { rejectUnauthorized: false },
      family: 4 // Force IPv4
    },
    migrations: {
      directory: './migrations'
    }
  }
};