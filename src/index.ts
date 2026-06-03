import { app } from '#/app.ts'
import { env } from '#/env.ts'
import { logger } from '#/logger.ts'

app.listen(env.PORT, () => {
  logger.info(`Server is running on http://localhost:${env.PORT}`)
  logger.info(`Environment: ${env.APP_STAGE}`)
})
