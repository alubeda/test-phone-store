import React from 'react'
import PropTypes from 'prop-types';

export default function Image({ product }) {
    const { imgUrl, brand, model } = product

    return (
        <div className="product-figure">
            <img src={imgUrl} alt={`Imagen de ${brand} ${model}`} className="product-image" />
            <figcaption className="product-caption">{brand} {model}</figcaption>
        </div>
    )
}

Image.propTypes = {
    product: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
    }).isRequired,
}
