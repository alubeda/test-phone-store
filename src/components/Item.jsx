import React from 'react'
import PropTypes from 'prop-types'
import Image from '@/components/Product/Image.jsx'

export default function Item({ product }) {
    const { brand, model, price } = product

    return (
        <article className="item-card">
            <Image product={product} />
            <div className="item-content">
                <h3 className="item-title">{brand} {model}</h3>
                { price ? (
                    <p className="item-price">
                        <data value={price}>{price} €</data>
                    </p>
                ) : (
                    <p className="unavailable-item">Product unavailable</p>
                )}
            </div>
        </article>
    )
}

Item.propTypes = {
    product: PropTypes.shape({
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        price: PropTypes.number,
    }).isRequired,
}
