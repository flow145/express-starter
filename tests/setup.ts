import { execSync } from 'node:child_process'
import { sql } from 'drizzle-orm'

import { logger } from '#/config/logger.ts'
import { db } from '#/db/connection.ts'
import { users } from '#/db/schema.ts'

export default async function setup() {
  logger.info('🗄️ Setting up test database...')

  try {
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)

    logger.info('🚀 Pushing schema using drizzle-kit...')
    execSync(
      `pnpm drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="src/db/schema.ts" --dialect="postgresql"`,
      {
        stdio: 'inherit',
        cwd: process.cwd(),
      },
    )

    logger.info('✅ Test database setup complete')
  } catch (error) {
    logger.error({ error }, '❌ Failed to setup test database')
    throw error
  }

  return async () => {
    logger.info('🧹 Tearing down test database...')

    try {
      await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)

      logger.info('✅ Test database teardown complete')
      process.exit(0)
    } catch (error) {
      logger.error({ error }, '❌ Failed to teardown test database:')
      throw error
    }
  }
}
