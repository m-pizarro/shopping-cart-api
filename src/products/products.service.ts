import { HttpException, Inject, Injectable, Logger } from '@nestjs/common'
import { randomAlphaNumeric } from '../core/utils/utils'
import { CreateProductDto } from './dto/create-product.dto'
import { IProduct } from './interfaces/product.interface'
import { IProductsRepository } from './interfaces/products.repository.interface'

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name)

  constructor(
    @Inject(IProductsRepository) private readonly productsRepository: IProductsRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    try {
      return await this.productsRepository.create({
        ...createProductDto,
        sku: randomAlphaNumeric(8),
      })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error creatting the product.', error.status || 500)
    }
  }

  async findAll(): Promise<IProduct[]> {
    try {
      return await this.productsRepository.findAll()
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error getting the products.', error.status || 500)
    }
  }
}
