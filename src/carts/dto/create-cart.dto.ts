import { CartStatus } from 'src/types'

export class ItemDto {
  productId: string
  quantity: number
}

export class CreateCartDto {
  products: ItemDto[] = []
  status: CartStatus = CartStatus.PENDING
}
