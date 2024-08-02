import { ConfigType, registerAs } from '@nestjs/config'

const configuration = registerAs('global', () => {
  // The host and port the application will run on
  const serverProtocol: string = process.env.SERVER_API_PROTOCOL || 'http'
  const serverHost: string = process.env.SERVER_API_HOST || 'localhost'
  const serverPort: number = parseInt(process.env.SERVER_API_PORT || '') || 3000

  // The environment the application is running in
  const environment: string = process.env.NODE_ENV || 'development'

  // PostgreSQL
  const databaseUrl: string = process.env.DATABASE_URL || ''

  return {
    serverProtocol,
    serverHost,
    serverPort,
    environment,
    databaseUrl,
  }
})

export type AppConfigType = ConfigType<typeof configuration>
export default configuration
