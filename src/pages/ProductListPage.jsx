import { useState, useEffect } from 'react'
import Search from '@/components/Search.jsx'
import Item from '@/components/Item.jsx'
import { fetchProducts } from '@/api.js'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ProductListPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setIsLoading(true)

        fetchProducts(searchTerm)
            .then(data => {
                setProducts(data)
                setHasError(false)
            })
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false))
    }, [searchTerm])

    useDocumentTitle('Product List')

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm)
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
                        <Link to={`/products/${product.id}`}>
                            <Item product={product} />
                        </Link>
                    </li>
                ))}
                </ul>
            }
        </div>
    );
}
