import { ConflictException, Injectable } from '@nestjs/common'
import { DatabaseService } from '../core/database/database.service'
import { CreateProductDto } from './dto/create-product.dto'
import { IProduct } from './interfaces/product.interface'
import { IProductsRepository } from './interfaces/products.repository.interface'

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(p: CreateProductDto & { sku: string }): Promise<IProduct> {
    try {
      return await this.db.product.create({
        data: {
          name: p.name,
          description: p.description,
          sku: p.sku,
        },
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`${error.meta.target} already registered`)
      }
      throw error
    }
  }

  async findAll(): Promise<IProduct[]> {
    return await this.db.product.findMany()
  }
}
