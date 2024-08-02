import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CartsModule } from './carts/carts.module'
import configuration from './core/config/configuration'
import { DatabaseModule } from './core/database/database.module'
import { ProductsModule } from './products/products.module'
import { LoggerMiddleware } from './core/middlewares/loggerMiddleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    CartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
