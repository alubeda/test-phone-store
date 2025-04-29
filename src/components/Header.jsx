import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import Breadcrumbs from '@/components/Breadcrumbs.jsx'

export default function Header() {
    const { cartCount } = useCart()

    return (
        <header className="app-header">
            <Link to="/">
                <h1 className="app-title">PocketLab Phone Store</h1>
            </Link>

            <Breadcrumbs />

            <div className="cart">
                <span role="img" aria-label="Cart">🛒</span>{' '}
                <strong>{ cartCount }</strong>
            </div>
        </header>
    )
}
