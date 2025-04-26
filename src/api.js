const BASE_API_URL = 'https://itx-frontend-test.onrender.com/api'

export const fetchProducts = async (searchTerm = '') => {
    const url = `${BASE_API_URL}/product`
    const response = await fetch(`${url}?search=${searchTerm}`)
    if (!response.ok) {
        throw new Error('Error fetching products')
    }
    const data = await response.json()

    return data
}

export const fetchProduct = async (productId) => {
    const url = `${BASE_API_URL}/product/${productId}`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Error fetching product')
    }
    const data = await response.json()

    return data
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
