// db.ts
import { Pool } from 'pg';

// Initialize the pool with connection configuration
const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 5432, // PostgreSQL default port
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}
let pool = null

export async function queryDatabase(query: string, values?: any[]) {
  pool = new Pool(config);

  const client = await pool.connect();
  console.log(`Log admin db postgres`);

  try {
    const result = await client.query(query, values);
    return result.rows;
  } finally {
    client.release();
  }
}

export default pool;
