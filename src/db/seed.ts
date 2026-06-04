import { logger } from '#/config/logger.ts'
import { db } from '#/db/connection.ts'
import { users } from '#/db/schema.ts'

export const seed = async () => {
  logger.info('🌱 Starting database seed...')

  try {
    logger.info('Clearing existing data...')

    await db.delete(users)

    logger.info('Creating demo users...')

    await db.insert(users).values([
      { email: 'alice@example.com', name: 'Alice', age: 30 },
      { email: 'bob@example.com', name: 'Bob', age: 25 },
      { email: 'alex@example.com', name: 'Alex', age: 33 },
    ])

    logger.info('✅ Database seeded successfully!')
  } catch (error) {
    logger.error('❌ Seeding failed:')
    logger.error(error)
    throw error
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`)
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      logger.error(error)
      process.exit(1)
    })
