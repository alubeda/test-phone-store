import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0)

    const updateCartCount = count => setCartCount(count)

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useCart = () => {
    return useContext(CartContext)
}
