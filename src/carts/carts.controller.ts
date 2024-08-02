import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ICartsService } from './interfaces/carts.service.interface'
import { UpdateCartDto } from './dto/update-cart.dto'

@Controller('carts')
export class CartsController {
  constructor(@Inject(ICartsService) private readonly cartsService: ICartsService) {}

  /**
   * Initialize a new Cart on PENDING status by default
   */
  @Post()
  @HttpCode(201)
  async create() {
    return await this.cartsService.createCart()
  }

  /**
   * Confirm a Cart by its ID. It will change the status to COMPLETED
   */
  @Patch(':id/confirm')
  @HttpCode(200)
  async confirm(@Param('id') id: string) {
    return await this.cartsService.confirmCart(id)
  }

  /**
   * Get carts by filters
   */
  @Get()
  @HttpCode(200)
  async getCarts(@Query() query) {
    return await this.cartsService.getCarts(query)
  }

  /**
   * Add a product to the cart
   */
  @Patch(':id/products/:productId')
  @HttpCode(200)
  async addProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    const { quantity } = updateCartDto
    return await this.cartsService.addProduct(id, productId, quantity)
  }

  /**
   * Remove a product from the cart
   */
  @Delete(':id/products/:productId')
  @HttpCode(200)
  async removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return await this.cartsService.removeProduct(id, productId)
  }
}
