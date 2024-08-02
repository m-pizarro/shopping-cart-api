import { CreateProductDto } from '../dto/create-product.dto'
import { IProduct } from './product.interface'

export interface IProductsService {
  create(createProductDto: CreateProductDto): Promise<IProduct>
  findAll(): Promise<IProduct[]>
}

export const IProductsService = Symbol('IProductsService')
