import { useState, useEffect } from 'react'
import Search from '@/components/Search.jsx'
import Item from '@/components/Search.jsx'
import { fetchProducts } from '@/api.js'

export default function ProductListPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data)
                setHasError(false)
            })
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false))
    }, [])

    const handleSearch = (searchTerm) => {
        console.warn(`Searching for: ${searchTerm}`)
    }

    return (
        <div className="product-list-page">
            {isLoading && (
                <div className="loader-overlay">
                    <div className="spinner"></div>
                </div>
            )}

            <Search onSearch={handleSearch} />

            {hasError ? (
                <p className="user-message error-message">There was an error fetching products.</p>
            ) : !isLoading && products.length === 0 ? (
                <p className="user-message info-message">No products found.</p>
            ) :
                <ul className="product-grid">
                {products.map(product => (
                    <li key={product.id} className="product-card">
                        <Item product={product} onClick={handleItemClick} />
                    </li>
                ))}
                </ul>
            }
        </div>
    );
}
