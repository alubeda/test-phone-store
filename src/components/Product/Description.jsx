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
            <p className="price">
                <data value={price}>{price} €</data>
            </p>

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
