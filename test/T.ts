import { INestApplication } from '@nestjs/common'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { DatabaseService } from '../src/core/database/database.service'
import { validationPipe } from '../src/core/pipes/validationPipe'
import { DbSeed } from './db-seed'
import { TestModule } from './test.module'

export class T {
  static async getE2eApp(
    modules,
    conf?: (moduleRef: TestingModuleBuilder) => void,
  ): Promise<{ app: INestApplication; db: DbSeed }> {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule].concat(modules),
    })

    conf && conf(moduleRef)
    const tm = await moduleRef.compile()
    const app = tm.createNestApplication({ bufferLogs: true })

    app.useGlobalPipes(validationPipe())

    await app.init()

    return { app, db: await T.getDb(app) }
  }
  static async getDb(app: INestApplication): Promise<DbSeed> {
    const db = await app.resolve(DatabaseService)

    return new DbSeed(db)
  }
}
