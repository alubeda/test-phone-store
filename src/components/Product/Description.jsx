import React from 'react'
import PropTypes from 'prop-types'

export default function Description({ product }) {
    const {
        brand,
        model,
        price,
        cpu,
        ram,
        os,
        displayResolution,
        battery,
        primaryCamera,
        secondaryCamera,
        dimentions,
        weight,
    } = product

    return (
        <article className="product-description">
            <h2 className="name">{ brand } { model }</h2>
            { price ? (
                <p className="price">
                    <data value={price}>{price} €</data>
                </p>
            ) : (
                <p className="unavailable-item">Product unavailable</p>
            )}

            <dl className="product-details">
                <dt>CPU</dt>
                <dd>{ cpu }</dd>

                <dt>Memory</dt>
                <dd>{ ram }</dd>

                <dt>OS</dt>
                <dd>{ os }</dd>

                <dt>Display Resolution</dt>
                <dd>{ displayResolution }</dd>

                <dt>Battery</dt>
                <dd>{ battery }</dd>

                <dt>Camera</dt>
                <dd>
                    <p>{ primaryCamera }</p>
                    { secondaryCamera ? <p>{ secondaryCamera }</p> : null }
                </dd>

                <dt>Dimensions</dt>
                <dd>{ dimentions }</dd>

                <dt>Weight</dt>
                <dd>{ weight }</dd>
            </dl>
        </article>
    )
}

Description.propTypes = {
    product: PropTypes.shape({
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        cpu: PropTypes.string.isRequired,
        ram: PropTypes.string.isRequired,
        os: PropTypes.string.isRequired,
        displayResolution: PropTypes.string.isRequired,
        battery: PropTypes.string.isRequired,
        primaryCamera: PropTypes.string.isRequired,
        secondaryCamera: PropTypes.string,
        dimentions: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired,
    }).isRequired,
}