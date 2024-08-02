import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { IProductsService } from './interfaces/products.service.interface'

@Controller('products')
export class ProductsController {
  constructor(@Inject(IProductsService) private readonly productsService: IProductsService) {}

  /**
   *  Create a product
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  /**
   *  Get all products
   */
  @Get()
  findAll() {
    return this.productsService.findAll()
  }
}
