import { Router } from 'express'
import { getUsersList } from './users.controller.ts'

export const usersRouter = Router()

usersRouter.get('/', getUsersList)
