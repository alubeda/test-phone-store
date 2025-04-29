import React from 'react'
import { Link } from 'react-router-dom'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

export default function Breadcrumbs () {
    const breadcrumbs = useBreadcrumbs() // tengo 3 ítemes

    return (
        <nav aria-label="breadcrumbs" className="breadcrumbs">
            <ul>
                { breadcrumbs.map((crumb, index) => {
                    return (
                        <li key={crumb.path}>
                            { index === breadcrumbs.length - 1 ? (
                                <span className="current">{crumb.title}</span>
                            ) : (
                                <Link to={crumb.path}>{crumb.title}</Link>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
