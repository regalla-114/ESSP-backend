import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '../config/env.js';
import * as schema from './schema/index.js';

// Create connection pool
export const poolConnection = mysql.createPool(env.DATABASE_URL);

// Initialize Drizzle ORM
export const db = drizzle(poolConnection, { schema, mode: 'default' });

export async function testDbConnection(): Promise<boolean> {
  try {
    const connection = await poolConnection.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('⚠️ Database connection warning:', (error as Error).message);
    return false;
  }
}
