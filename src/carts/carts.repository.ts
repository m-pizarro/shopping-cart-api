import { Injectable } from '@nestjs/common'
import { CartStatus } from 'src/types'
import { DatabaseService } from '../core/database/database.service'
import { CartFiltersDto, CartsFiltersDto } from './dto/cart.dto'
import { CreateCartDto } from './dto/create-cart.dto'
import { ICart, IProductCart } from './interfaces/cart.interface'
import { ICartsRepository } from './interfaces/carts.repository.interface'

@Injectable()
export class CartsRepository implements ICartsRepository {
  constructor(private readonly db: DatabaseService) {}

  async findCarts(filter: CartsFiltersDto): Promise<ICart[]> {
    const { status } = filter
    return await this.db.cart.findMany({
      where: {
        ...(status && { status: status }),
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }

  async findCart(filter: CartFiltersDto): Promise<ICart> {
    const { id, status } = filter
    return await this.db.cart.findFirst({
      where: {
        ...(id && { id: id }),
        ...(status && { status: status }),
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }

  async create(c: CreateCartDto): Promise<ICart> {
    return await this.db.cart.create({
      data: {
        status: c.status,
        products: {
          createMany: {
            data: c.products.map(p => ({
              quantity: p.quantity,
              productId: p.productId,
            })),
          },
        },
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }

  async update(cartId: string, status: CartStatus): Promise<ICart> {
    return await this.db.cart.update({
      where: {
        id: cartId,
      },
      data: {
        status: status,
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }

  async addProduct(cartId: string, productId: string, quantity: number): Promise<ICart> {
    return await this.db.cart.update({
      where: { id: cartId },
      data: {
        products: {
          create: {
            productId: productId,
            quantity: quantity,
          },
        },
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }

  async updateCartProduct(cartId: string, product: IProductCart): Promise<ICart> {
    return await this.db.cart.update({
      where: { id: cartId },
      data: {
        products: {
          update: {
            where: {
              productId_cartId: {
                cartId: cartId,
                productId: product.product.id,
              },
            },
            data: {
              quantity: product.quantity,
            },
          },
        },
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }

  async removeProduct(cartId: string, productId: string): Promise<ICart> {
    return await this.db.cart.update({
      where: { id: cartId },
      data: {
        products: {
          delete: {
            productId_cartId: {
              cartId: cartId,
              productId: productId,
            },
          },
        },
      },
      include: {
        products: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    })
  }
}
