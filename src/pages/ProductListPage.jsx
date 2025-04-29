import { useState, useEffect } from 'react'
import Search from '@/components/Search.jsx'
import Item from '@/components/Item.jsx'
import { fetchProducts } from '@/api.js'
import { Link, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ProductListPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const term = searchParams.get('term') || ''
    const page = parseInt(searchParams.get('page')) || 1

    const [pagination, setPagination] = useState({
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        pageSize: 20,
    })

    useEffect(() => {
        setIsLoading(true)

        fetchProducts({ term, page, limit: pagination.pageSize })
            .then(({ products, pagination }) => {
                setProducts(products)
                setPagination(pagination)
                setHasError(false)
            })
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false))
    }, [term, page])

    useDocumentTitle('Product List')

    const handleSearch = (searchTerm) => {
        const params = {}

        if (searchTerm !== '') {
            params.term = searchTerm
        }

        setSearchParams(params)
    }

    const handlePageChange = newPage => {
        const params = {}

        if (term !== '') {
            params.term = term
        }

        if (newPage > 1) {
            params.page = newPage
        }

        setSearchParams(params)
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            handlePageChange(page - 1)
        }
    }

    const handleNextPage = () => {
        if (page < pagination.totalPages) {
            handlePageChange(page + 1)
        }
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
                <>
                    <ul className="product-grid">
                    {products.map(product => (
                        <li key={product.id} className="product-card">
                            <Link to={`/products/${product.id}`}>
                                <Item product={product} />
                            </Link>
                        </li>
                    ))}
                    </ul>

                    <div className="pagination-controls">
                        <button type="button" className="pagination page-previous" onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                        <span className="current-page">Page {page} of {pagination.totalPages}</span>
                        <button type="button" className="pagination page-next" onClick={handleNextPage} disabled={page === pagination.totalPages}>Next</button>
                    </div>
                </>
            }
        </div>
    )
}
