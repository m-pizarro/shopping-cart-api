import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { IProductsRepository } from './interfaces/products.repository.interface'
import { ProductsRepository } from './products.repository'
import { DatabaseModule } from '../core/database/database.module'
import { IProductsService } from './interfaces/products.service.interface'

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
    {
      provide: IProductsService,
      useClass: ProductsService,
    },
  ],
})
export class ProductsModule {}
