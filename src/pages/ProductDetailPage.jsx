import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct, addProductToCart } from '@/api.js'
import Image from '@/components/Product/Image.jsx'
import Description from '@/components/Product/Description.jsx'
import Actions from '@/components/Product/Actions.jsx'
import { useCart } from '@/context/CartContext'

export default function ProductListPage() {
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [hasFetchError, setHasFetchError] = useState(false)
    const [hasCartError, setHasCartError] = useState(false)

    const { updateCartCount } = useCart()

    useEffect(() => {
        fetchProduct(productId)
            .then(data => {
                setProduct(data)
                setHasFetchError(false)
            })
            .catch(() => setHasFetchError(true))
            .finally(() => setIsLoading(false))
    }, [productId])

    const addToCart = ({ storage, colour }) => {
        setIsLoading(true)

        addProductToCart({
            id: productId,
            storage,
            colour,
        })
        .then(result => {
            setHasCartError(false)
            updateCartCount(result.count)
        })
        .catch(() => setHasCartError(true))
        .finally(() => setIsLoading(false))
    }

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

            {hasFetchError ? (
                <p className="user-message error-message">There was an error fetching this product.</p>
            ) : !isLoading && !product ? (
                <p className="user-message info-message">Product not found.</p>
            ) : <>
                    <Image product={product} />
                    <div className="product-info">
                        <Description product={product} />
                        {product.price && (
                            <Actions options={product.options} onSelect={addToCart} />
                        )}
                        {hasCartError && (
                            <p className="user-message error-message">There was an error adding this product to the cart.</p>
                        )}
                    </div>
                </>
            }
        </div>
    );
}