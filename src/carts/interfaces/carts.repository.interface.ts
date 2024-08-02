import { CartStatus } from 'src/types'
import { CartFiltersDto, CartsFiltersDto } from '../dto/cart.dto'
import { CreateCartDto } from '../dto/create-cart.dto'
import { ICart, IProductCart } from './cart.interface'

export interface ICartsRepository {
  findCarts(filter: CartsFiltersDto): Promise<ICart[]>
  findCart(filter: CartFiltersDto): Promise<ICart>
  create(c: CreateCartDto): Promise<ICart>
  update(cartId: string, status: CartStatus)
  addProduct(id: string, productId: string, quantity: number): Promise<ICart>
  updateCartProduct(cartId: string, product: IProductCart): Promise<ICart>
  removeProduct(id: string, productId: string): Promise<ICart>
}

export const ICartsRepository = Symbol('ICartsRepository')
