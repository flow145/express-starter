import { env as loadEnv } from 'custom-env'
import { z } from 'zod'

process.env.APP_STAGE = process.env.APP_STAGE || 'dev'

// const isProduction = process.env.APP_STAGE === 'production'
const isDevelopment = process.env.APP_STAGE === 'dev'
const isTesting = process.env.APP_STAGE === 'test'
const isStaging = process.env.APP_STAGE === 'staging'

if (isDevelopment) loadEnv('development')
if (isTesting) loadEnv('test')
if (isStaging) loadEnv('staging')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_STAGE: z.enum(['dev', 'prod', 'test', 'staging']).default('dev'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
})

export type Env = z.infer<typeof envSchema>

export let env: Env

try {
  env = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:')

    error.issues.forEach(({ path, message, code, input }) => {
      console.log(`${path.join('.')}: ${message}, code: ${code}, input: ${input}`)
    })

    process.exit(1)
  }

  throw error
}

export const isProdEnv = () => env.APP_STAGE === 'prod'
export const isDevEnv = () => env.APP_STAGE === 'dev'
export const isTestEnv = () => env.APP_STAGE === 'test'
export const isStagingEnv = () => env.APP_STAGE === 'staging'
