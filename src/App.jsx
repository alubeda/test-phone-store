import React from 'react'
import Header from '@/components/Header.jsx'
import AppRoutes from '@/router/router.jsx';
import { CartProvider } from '@/context/CartContext.jsx';

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <main className="app-main">
          <AppRoutes />
        </main>
      </CartProvider>
    </>
  )
}

export default App
