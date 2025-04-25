import { Link } from 'react-router-dom'

export default function Item({ product, onClick }) {
    const { imgUrl, brand, model, price } = product

    return (
        <article className="item-card" onClick="{onClick}">
            <figure className="item-figure">
                <img src={imgUrl} alt={`Imagen de ${brand} ${model}`} className="item-image" />
                <figcaption className="item-caption">{brand} {model}</figcaption>
            </figure>
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
