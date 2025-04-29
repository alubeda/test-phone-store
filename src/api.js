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

export const fetchProducts = async (searchTerm = '') => {
    const url = `${BASE_API_URL}/product`

    try {
        return fetchData(`${url}?search=${searchTerm}`)
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
