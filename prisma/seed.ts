import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()
  await prisma.product.createMany({
    data: [
      {
        name: 'Product 1',
        sku: 'SKU001',
        description: 'Description for Product 1',
      },
      {
        name: 'Product 2',
        sku: 'SKU002',
        description: 'Description for Product 2',
      },
      {
        name: 'Product 3',
        sku: 'SKU003',
        description: 'Description for Product 3',
      },
      {
        name: 'Product 4',
        sku: 'SKU004',
        description: 'Description for Product 4',
      },
      {
        name: 'Product 5',
        sku: 'SKU005',
        description: 'Description for Product 5',
      },
      {
        name: 'Product 6',
        sku: 'SKU006',
        description: 'Description for Product 6',
      },
      {
        name: 'Product 7',
        sku: 'SKU007',
        description: 'Description for Product 7',
      },
      {
        name: 'Product 8',
        sku: 'SKU008',
        description: 'Description for Product 8',
      },
      {
        name: 'Product 9',
        sku: 'SKU009',
        description: 'Description for Product 9',
      },
      {
        name: 'Product 10',
        sku: 'SKU010',
        description: 'Description for Product 10',
      },
    ],
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
