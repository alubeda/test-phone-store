import fetchMock from 'jest-fetch-mock'
import 'jest-localstorage-mock'

fetchMock.enableMocks()

import { fetchProducts, fetchProduct, addProductToCart } from './api'

describe('fetchProducts', () => {
    const allProductsMock = [
        { id: '123', brand: 'Apple', model: 'iPhone' },
        { id: '456', brand: 'Samsung', model: 'Galaxy S' },
        { id: '789', brand: 'Huawei', model: 'P20 Pro' },
        { id: '101112', brand: 'Xiaomi', model: 'Mi 10' },
        { id: '131415', brand: 'Samsung', model: 'Galaxy S20' },
    ]

    beforeEach(() => {
        fetch.resetMocks()
        localStorage.clear()
    })

    it('should throw an error if the request fails', async () => {
        fetch.mockRejectOnce(() => Promise.reject(new Error('Failed to fetch products')))

        await expect(fetchProducts()).rejects.toThrow('Error fetching products')
    })

    it('should throw an error if the response is not ok', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'Failed to fetch products' }), { status: 500 })

        await expect(fetchProducts()).rejects.toThrow('Error fetching products')
    })

    it('should return all the products if no parameters are passed', async () => {
        fetch.mockResponseOnce(JSON.stringify(allProductsMock))

        const result = await fetchProducts()
        expect(result).toEqual({
            products: allProductsMock,
            pagination: {
                currentPage: 1,
                pageSize: 5,
                totalItems: 5,
                totalPages: 1,
            },
        })
    })

    it('should return the products filtered by the term if there is any', async () => {
        fetch.mockResponseOnce(JSON.stringify(allProductsMock))

        const result = await fetchProducts({ term: 'sAMSUng  ' })
        expect(result).toEqual({
            products: [allProductsMock[1], allProductsMock[4]],
            pagination: {
                currentPage: 1,
                pageSize: 2,
                totalItems: 2,
                totalPages: 1,
            },
        })
    })

    it('should limit the number of products returned if limit is passed', async () => {
        fetch.mockResponseOnce(JSON.stringify(allProductsMock))

        const result = await fetchProducts({ page: 2, limit: 2 })
        expect(result).toEqual({
            products: allProductsMock.slice(2, 4),
            pagination: {
                currentPage: 2,
                pageSize: 2,
                totalItems: 5,
                totalPages: 3,
            },
        })
    })
})

describe('fetchProduct', () => {
    beforeEach(() => {
        fetch.resetMocks()
        localStorage.clear()
    })

    it('should throw an error if the request fails', async () => {
        fetch.mockRejectOnce(() => Promise.reject(new Error('Failed to fetch product')))

        await expect(fetchProduct('123')).rejects.toThrow('Error fetching product')
    })

    it('should throw an error if the response is not ok', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'Failed to fetch product' }), { status: 500 })

        await expect(fetchProduct('123')).rejects.toThrow('Error fetching product')
    })

    it('should return the product if it exists', async () => {
        fetch.mockResponseOnce(JSON.stringify({ id: '123', brand: 'Apple', model: 'iPhone' }))

        const result = await fetchProduct('123')
        expect(result).toEqual({ id: '123', brand: 'Apple', model: 'iPhone' })
    })

    it('should fetch the product from local storage if it exists', async () => {
        const cacheKey = 'itx-cache-https://itx-frontend-test.onrender.com/api/product/123'

        fetch.mockResponseOnce(JSON.stringify({ id: '123', brand: 'Apple', model: 'iPhone', origin: 'api' }))
        localStorage.setItem(cacheKey, JSON.stringify({ data: { id: '123', brand: 'Apple', model: 'iPhone', origin: 'storage' }, expiration: Date.now() + 1000 }))

        const result = await fetchProduct('123')
        expect(result).toEqual({ id: '123', brand: 'Apple', model: 'iPhone', origin: 'storage' })
    })

    it('should discard the product from local storage if it is expired', async () => {
        const cacheKey = 'itx-cache-https://itx-frontend-test.onrender.com/api/product/123'

        fetch.mockResponseOnce(JSON.stringify({ id: '123', brand: 'Apple', model: 'iPhone', origin: 'api' }))
        localStorage.setItem(cacheKey, JSON.stringify({ data: { id: '123', brand: 'Apple', model: 'iPhone', origin: 'storage' }, expiration: Date.now() - 1000 }))

        const result = await fetchProduct('123')
        expect(result).toEqual({ id: '123', brand: 'Apple', model: 'iPhone', origin: 'api' })
    })
})

describe('addProductToCart', () => {
    beforeEach(() => {
        fetch.resetMocks()
        localStorage.clear()
    })

    it('should throw an error if the request fails', async () => {
        fetch.mockRejectOnce(() => Promise.reject(new Error('Failed to add product to cart')))

        await expect(addProductToCart({ id: '123', storage: '123', colour: 'red' })).rejects.toThrow('Failed to add product to cart')
    })

    it('should throw an error if the response is not ok', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'Failed to add product to cart' }), { status: 500 })

        await expect(addProductToCart({ id: '123', storage: '123', colour: 'red' })).rejects.toThrow('Failed to add product to cart')
    })

    it('should return the response if it is ok', async () => {
        fetch.mockResponseOnce(JSON.stringify({ items: 1 }))

        const result = await addProductToCart({ id: '123', storage: '123', colour: 'red' })
        expect(result).toEqual({ items: 1 })
    })
})
