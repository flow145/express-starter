import { remember } from '@epic-web/remember'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { env, isProdEnv } from '#/env.ts'

const createPool = () =>
  new Pool({
    connectionString: env.DATABASE_URL,
  })

const client = isProdEnv() ? createPool() : remember('dbPool', createPool)

export const db = drizzle({ client })
