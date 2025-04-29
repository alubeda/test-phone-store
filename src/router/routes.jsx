import React from 'react'
import { Navigate } from 'react-router-dom'
import ProductListPage from '@/pages/ProductListPage.jsx'
import ProductDetailPage from '@/pages/ProductDetailPage.jsx'

export const routes = [
    { path: '/', title: 'Home', element: <Navigate to="/products" replace /> },
    { path: '/products', title: 'Products', element: <ProductListPage /> },
    { path: '/products/:productId', title: 'Product details', element: <ProductDetailPage /> },
]
