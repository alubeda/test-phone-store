import { Routes, Route, Navigate } from 'react-router-dom'
import ProductListPage from '@/pages/ProductListPage.jsx'
import ProductDetailPage from '@/pages/ProductDetailPage.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
        </Routes>
    )
}
