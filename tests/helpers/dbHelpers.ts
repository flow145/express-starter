import { db } from '#/db/connection.ts'
import { type NewUser, users } from '#/db/schema.ts'

export const createTestUser = async (userData: Partial<NewUser> = {}) => {
  const defaultData = {
    email: `test-${Date.now()}-${Math.random()}@example.com`,
    name: `testuser-${Date.now()}-${Math.random()}`,
    age: Math.floor(Math.random() * (80 - 18) + 18),
  }

  const [user] = await db
    .insert(users)
    .values({ ...defaultData, ...userData })
    .returning()

  return { user }
}

export const cleanupDatabase = async () => {
  await db.delete(users)
}
