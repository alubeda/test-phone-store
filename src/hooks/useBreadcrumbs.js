import { useLocation, matchRoutes } from 'react-router-dom'
import { routes } from '@/router/routes'

export function useBreadcrumbs() {
    const location = useLocation()

    const partialRoutes = location.pathname.split('/').reduce((acc, current) => {
        const part = acc.length === 0
            ? `${current}/`
            : `${acc[acc.length - 1]}${current}/`

        acc.push(part)

        return acc
    }, [])

    return partialRoutes.reduce((acc, partialRoute) => {
        const matches = matchRoutes(routes, partialRoute)

        for (const match of matches) {
            const alreadyExists = acc.find(crumb => crumb.path === match.route.path)
            if (!alreadyExists) {
                acc.push({
                    title: match.route.title,
                    path: match.route.path,
                })
            }
        }

        return acc
    }, [])
}
