import Header from '@/components/Header.jsx'
import AppRoutes from '@/router';
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
