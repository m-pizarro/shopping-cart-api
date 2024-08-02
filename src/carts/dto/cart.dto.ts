import { CartStatus } from 'src/types'

export class CartsFiltersDto {
  status?: CartStatus
}

export class CartFiltersDto {
  id?: string
  status?: CartStatus
}
