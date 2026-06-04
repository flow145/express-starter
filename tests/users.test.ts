import request from 'supertest'

import { app } from '#/app.ts'

import { cleanupDatabase, createTestUser } from './dbHelpers.ts'

describe('User endpoints', () => {
  afterEach(async () => {
    await cleanupDatabase()
  })

  describe('GET /api/users', () => {
    it('should return user list sorted by creation date descending', async () => {
      await createTestUser()
      await createTestUser()

      const res = await request(app).get('/api/users').expect(200)

      expect(res.body).toMatchObject({
        users: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            age: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      })
      expect(res.body.users).toHaveLength(2)
    })
  })
})
