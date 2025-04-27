import { Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}
