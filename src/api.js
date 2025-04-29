const BASE_API_URL = 'https://itx-frontend-test.onrender.com/api'
const CACHE_EXPIRATION = 60 * 60 * 1000 // 1 hour
const CACHE_PREFIX = 'itx-cache-'

const loadCachedData = async(key) => {
    const cachedData = localStorage.getItem(key)
    if (!cachedData) {
        return null
    }

    const parsedData = JSON.parse(cachedData)
    if (parsedData.expiration < Date.now()) {
        localStorage.removeItem(key)

        return null
    }

    return parsedData.data
}

const saveDataToCache = async(key, data) => {
    const expiration = Date.now() + CACHE_EXPIRATION

    localStorage.setItem(key, JSON.stringify({
        data,
        expiration,
    }))
}

const fetchData = async(url) => {
    const cacheKey = `${CACHE_PREFIX}${url}`

    const cachedData = await loadCachedData(cacheKey)
    if (cachedData) {
        return cachedData
    }

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Error fetching data')
    }

    const data = await response.json()
    await saveDataToCache(cacheKey, data)

    return data
}

export const fetchProducts = async ({ term = '', page = 1, limit }) => {
    const url = new URL(`${BASE_API_URL}/product`)
    url.searchParams.set('term', term)
    url.searchParams.set('page', page)

    try {
        const allProducts = await fetchData(url)

        // Filter simulation since there is no apparent method to filter via API
        const searchTerms = term ? term.toLowerCase().split(' ').filter(Boolean) : []

        const filteredProducts = searchTerms.length > 0
            ? allProducts.filter(product => {
                const brand = product.brand.toLowerCase()
                const model = product.model.toLowerCase()

                return searchTerms.every(searchTerm => {
                    return brand.includes(searchTerm) || model.includes(searchTerm)
                })
            })
            : allProducts.slice()

        const products = filteredProducts.slice((page - 1) * limit, page * limit)

        const pagination = {
            currentPage: page,
            totalPages: limit !== undefined ? Math.ceil(filteredProducts.length / limit) : 0,
            totalItems: filteredProducts.length,
            pageSize: limit,
        }

        return { products, pagination }
    } catch (error) {
        throw new Error('Error fetching products')
    }
}

export const fetchProduct = async (productId) => {
    const url = `${BASE_API_URL}/product/${productId}`
    try {
        return fetchData(url)
    } catch (error) {
        throw new Error('Error fetching product')
    }
}

export const addProductToCart = async ({ id, storage, colour }) => {
    const url = `${BASE_API_URL}/cart`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            colorCode: colour,
            storageCode: storage,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to add product to cart')
    }

    return response.json()
}
