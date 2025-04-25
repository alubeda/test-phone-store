import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '@/api.js'
import Image from '@/components/Product/Image.jsx'
import Description from '@/components/Product/Description.jsx'
import Actions from '@/components/Product/Actions.jsx'

export default function ProductListPage() {
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        fetchProduct(productId)
            .then(data => {
                setProduct(data)
                setHasError(false)
            })
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false))
    }, [productId])

    return (
        <div className="product-detail-page">
            <Link to="/products" className="back-link">← Back to product list</Link>

            <div className="product-detail-grid">
                {isLoading && (
                    <div className="loader-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
            </div>

            {hasError ? (
                <p className="user-message error-message">There was an error fetching this product.</p>
            ) : !isLoading && !product ? (
                <p className="user-message info-message">Product not found.</p>
            ) : <>
                    <Image product={product} />
                    <div className="product-info">
                        <Description product={product} />
                        <Actions product={product} />
                    </div>
                </>
            }
        </div>
    );
}