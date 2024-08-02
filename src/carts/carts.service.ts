import { HttpException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CartStatus } from '../../src/types'
import { ICart } from './interfaces/cart.interface'
import { ICartsRepository } from './interfaces/carts.repository.interface'
import { CartsFiltersDto } from './dto/cart.dto'

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name)

  constructor(@Inject(ICartsRepository) private readonly cartsRepository: ICartsRepository) {}

  async createCart(): Promise<ICart> {
    try {
      const pendingCart = await this.cartsRepository.findCart({ status: CartStatus.PENDING })
      if (pendingCart) {
        return pendingCart
      } else {
        // Create by default on pending status
        return await this.cartsRepository.create({ status: CartStatus.PENDING, products: [] })
      }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error creating the cart.', error.status || 500)
    }
  }

  async confirmCart(id: string): Promise<ICart> {
    try {
      const pendingCart = await this.cartsRepository.findCart({ id, status: CartStatus.PENDING })
      if (pendingCart) {
        return await this.cartsRepository.update(id, CartStatus.COMPLETED)
      } else {
        throw new NotFoundException('Cart not found')
      }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error confirming the cart.', error.status || 500)
    }
  }

  async getCarts(filter: CartsFiltersDto): Promise<ICart[]> {
    try {
      return await this.cartsRepository.findCarts(filter)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error getting the carts.', error.status || 500)
    }
  }

  async addProduct(id: string, productId: string, quantity: number): Promise<ICart> {
    try {
      const cart = await this.cartsRepository.findCart({ id, status: CartStatus.PENDING })
      if (!cart) {
        throw new NotFoundException('Cart not found')
      }

      const product = cart.products.find(p => p.product.id === productId)
      if (product) {
        product.quantity = quantity
        return await this.cartsRepository.updateCartProduct(id, product)
      } else {
        return await this.cartsRepository.addProduct(id, productId, quantity)
      }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error adding the product.', error.status || 500)
    }
  }

  async removeProduct(id: string, productId: string): Promise<ICart> {
    try {
      const cart = await this.cartsRepository.findCart({ id, status: CartStatus.PENDING })
      if (!cart) {
        throw new NotFoundException('Cart not found')
      }
      const product = cart.products.find(p => p.product.id === productId)
      if (!product) {
        throw new NotFoundException('Product not found')
      }
      return await this.cartsRepository.removeProduct(id, productId)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('There was an error deleting the product.', error.status || 500)
    }
  }
}
