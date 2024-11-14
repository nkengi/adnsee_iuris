// db.ts
import { Pool } from 'pg';

// Initialize the pool with connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432, // PostgreSQL default port
});

export async function queryDatabase(query: string, values?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } finally {
    client.release();
  }
}

export default pool;
