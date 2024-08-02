import { IProduct } from 'src/products/interfaces/product.interface'

export interface IProductCart {
  quantity: number
  product: IProduct
}

export interface ICart {
  id: string
  status: string
  products: IProductCart[]
}
