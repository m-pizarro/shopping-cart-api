import { Module } from '@nestjs/common'
import { CartsService } from './carts.service'
import { CartsController } from './carts.controller'
import { ICartsRepository } from './interfaces/carts.repository.interface'
import { CartsRepository } from './carts.repository'
import { ICartsService } from './interfaces/carts.service.interface'
import { DatabaseModule } from '../core/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CartsController],
  providers: [
    {
      provide: ICartsRepository,
      useClass: CartsRepository,
    },
    {
      provide: ICartsService,
      useClass: CartsService,
    },
  ],
})
export class CartsModule {}
