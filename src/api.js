export const fetchProducts = async (searchTerm = '') => {
    const response = await fetch(`/api/products?search=${searchTerm}`)
    if (!response.ok) {
        throw new Error('Error fetching products')
    }
    const data = await response.json()

    return data
}
