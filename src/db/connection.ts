import { remember } from '@epic-web/remember'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { env, isProdEnv } from '#/config/env.ts'
import { logger } from '#/config/logger.ts'

import * as schema from './schema.ts'

const createPool = () =>
  new Pool({
    connectionString: env.DATABASE_URL,
  })

export const pool = isProdEnv() ? createPool() : remember('dbPool', createPool)

pool.on('error', (error) => {
  logger.error({ error }, 'Unexpected database pool error')
})

export const db = drizzle({ client: pool, schema })

export const connectDb = async () => {
  await pool.query('SELECT 1')
  logger.info('Database connection established')
}
