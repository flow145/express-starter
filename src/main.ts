import { app } from '#/app.ts'
import { env } from '#/config/env.ts'
import { logger } from '#/config/logger.ts'

const server = app.listen(env.PORT, () => {
  logger.info(`Server is running on http://localhost:${env.PORT}`)
  logger.info(`Environment: ${env.APP_STAGE}`)
})

let isShuttingDown = false

const shutdown = (signal: string) => {
  if (isShuttingDown) return
  isShuttingDown = true
  logger.info(`${signal} received, shutting down...`)

  server.close(async (error) => {
    if (error) {
      logger.error(error, 'Error on server close')
      process.exit(1)
    }

    try {
      // TODO close db connections
      logger.info('Server shut down gracefully')
      process.exit(0)
    } catch (err) {
      logger.error(err, 'Error on graceful shutdown')
      process.exit(1)
    }
  })
}

;['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => shutdown(signal))
})
