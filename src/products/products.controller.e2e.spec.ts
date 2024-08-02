import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { DbSeed } from 'test/db-seed'
import { ProductsModule } from './products.module'
import { T } from '../../test/T'

describe('ProductsController', () => {
  let app: INestApplication
  let db: DbSeed

  beforeAll(async () => {
    ;({ app, db } = await T.getE2eApp([ProductsModule]))
    await db.dropDB()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /products', () => {
    it('should create a product', async () => {
      const productName = `Product ${Date.now()}`
      const response = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: productName,
          description: 'Description of product',
        })
        .expect(201)

      expect(response.body).toEqual({
        id: expect.any(String),
        name: productName,
        description: 'Description of product',
        sku: expect.any(String),
      })
    })

    it('should return 400 when creating a product with invalid data', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product 1',
        })
        .expect(400)
    })

    it('should return 409 when creating a product with a name that already exists', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Test',
          description: 'Description of product 1',
        })
        .expect(201)

      await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Test',
          description: 'Description of product 1',
        })
        .expect(409)
    })
  })

  describe('GET /products', () => {
    it('should return a list of products', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send({
          name: `Product ${Date.now()}`,
          description: 'Description of product',
        })
        .expect(201)

      await request(app.getHttpServer())
        .post('/products')
        .send({
          name: `Product ${Date.now()}`,
          description: 'Description of product',
        })
        .expect(201)

      const response = await request(app.getHttpServer()).get('/products').expect(200)

      expect(response.body.length).toBeGreaterThanOrEqual(2)
    })
  })
})
