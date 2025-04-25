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
