import { INestApplication } from '@nestjs/common'
import { DbSeed } from 'test/db-seed'
import { T } from '../../test/T'
import { CartsModule } from './carts.module'
import request from 'supertest'
import { ProductsModule } from '../products/products.module'

describe('CartsController', () => {
  let app: INestApplication
  let db: DbSeed

  beforeAll(async () => {
    ;({ app, db } = await T.getE2eApp([ProductsModule, CartsModule]))
    await db.dropDB()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /carts', () => {
    it('should create a cart', async () => {
      const response = await request(app.getHttpServer()).post('/carts').expect(201)

      expect(response.body).toEqual({
        id: expect.any(String),
        status: 'PENDING',
        products: [],
      })
    })
  })

  describe('GET /carts', () => {
    it('should return an empty array when there are no carts', async () => {
      const response = await request(app.getHttpServer()).get('/carts').expect(200)

      expect(response.body.length).toBeGreaterThan(0)
    })

    it('should return a list of carts', async () => {
      await request(app.getHttpServer()).post('/carts').expect(201)

      const response = await request(app.getHttpServer()).get('/carts?status=PENDING').expect(200)

      expect(response.body).toHaveLength(1)
    })
  })

  describe('POST /carts/:id/products', () => {
    it('should return 404 when the cart does not exist', async () => {
      await request(app.getHttpServer())
        .post('/carts/1/products')
        .send({
          productId: '1',
          quantity: 1,
        })
        .expect(404)
    })
  })

  describe('POST /carts/:id/confirm', () => {
    it('should return 404 when the cart does not exist', async () => {
      await request(app.getHttpServer()).post('/carts/1/confirm').expect(404)
    })

    it('should confirm a cart', async () => {
      const cart = await request(app.getHttpServer()).post('/carts').expect(201)

      await request(app.getHttpServer()).patch(`/carts/${cart.body.id}/confirm`).expect(200)
    })
  })

  describe('PATCH /carts/:id/products/:productId', () => {
    it('should return 404 when the cart does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/carts/1/products/1')
        .send({
          quantity: 1,
        })
        .expect(404)
    })

    it('should add a product to the cart', async () => {
      const cart = await request(app.getHttpServer()).post('/carts').expect(201)

      const product = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product 1',
          description: 'Description of product 1',
        })
        .expect(201)

      await request(app.getHttpServer())
        .patch(`/carts/${cart.body.id}/products/${product.body.id}`)
        .send({
          quantity: 1,
        })
        .expect(200)
    })

    it('should update a product in the cart', async () => {
      const cart = await request(app.getHttpServer()).post('/carts').expect(201)

      const product = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: `Product ${Date.now()}`,
          description: 'Description of product',
        })
        .expect(201)

      await request(app.getHttpServer())
        .patch(`/carts/${cart.body.id}/products/${product.body.id}`)
        .send({
          quantity: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .patch(`/carts/${cart.body.id}/products/${product.body.id}`)
        .send({
          quantity: 2,
        })
        .expect(200)
    })
  })

  describe('DELETE /carts/:id/products/:productId', () => {
    it('should return 404 when the cart does not exist', async () => {
      await request(app.getHttpServer()).delete('/carts/1/products/1').expect(404)
    })

    it('should return 404 when the product does not exist', async () => {
      const cart = await request(app.getHttpServer()).post('/carts').expect(201)

      await request(app.getHttpServer()).delete(`/carts/${cart.body.id}/products/1`).expect(404)
    })

    it('should remove a product from the cart', async () => {
      const cart = await request(app.getHttpServer()).post('/carts').expect(201)

      const product = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: `Product ${Date.now()}`,
          description: 'Description of product',
        })
        .expect(201)

      await request(app.getHttpServer())
        .patch(`/carts/${cart.body.id}/products/${product.body.id}`)
        .send({
          quantity: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .delete(`/carts/${cart.body.id}/products/${product.body.id}`)
        .expect(200)
    })
  })
})
