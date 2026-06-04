import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { logger } from '#/config/logger.ts'
import { findAllUsers } from './users.service.ts'

export const getUsersList = async (_req: Request, res: Response) => {
  try {
    const userList = await findAllUsers()
    res.json({ users: userList })
  } catch (error) {
    logger.error({ error }, 'Get users error')
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch users' })
  }
}
