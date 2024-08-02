import { CreateProductDto } from '../dto/create-product.dto'
import { IProduct } from './product.interface'

export interface IProductsRepository {
  create(p: CreateProductDto & { sku: string }): Promise<IProduct>
  findAll(): Promise<IProduct[]>
}

export const IProductsRepository = Symbol('IProductsRepository')
