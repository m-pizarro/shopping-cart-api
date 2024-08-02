import { CartsFiltersDto } from '../dto/cart.dto'
import { ICart } from './cart.interface'

export interface ICartsService {
  getCarts(filter: CartsFiltersDto): Promise<ICart[]>
  createCart(): Promise<ICart>
  confirmCart(id: string): Promise<ICart>
  addProduct(cartId: string, productId: string, quantity: number): Promise<ICart>
  removeProduct(cartId: string, productId: string): Promise<ICart>
}

export const ICartsService = Symbol('ICartsService')
