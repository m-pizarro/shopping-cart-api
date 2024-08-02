import { Prisma } from '.prisma/client'
import { DatabaseService } from '../src/core/database/database.service'

export class DbSeed {
  constructor(public query: DatabaseService) {}
  async dropDB() {
    if (process.env.NODE_ENV !== 'test') throw new Error('be careful, this will drop your database')
    const modelNames = Prisma.dmmf.datamodel.models.map(model => model.name)

    return await Promise.all(
      modelNames.map(modelName =>
        this.query[modelName[0].toLocaleLowerCase() + modelName.slice(1)].deleteMany({}),
      ),
    )
  }
}
