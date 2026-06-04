import { desc } from 'drizzle-orm'

import { db } from '#/db/connection.ts'
import { users } from '#/db/schema.ts'

export const findAllUsers = async () => {
  return db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
  })
}
