import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { validationPipe } from './core/pipes/validationPipe'
import { ConfigType } from '@nestjs/config'
import configuration from './core/config/configuration'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigType<typeof configuration>>(configuration.KEY)
  const logger = new Logger('Bootstrap')

  app.enableCors()

  app.useGlobalPipes(validationPipe())

  await app.listen(config.serverPort)
  logger.log(
    `Application is running on ${config.serverProtocol}://${config.serverHost}:${config.serverPort}`,
  )
}
bootstrap()
