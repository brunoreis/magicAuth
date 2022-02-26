import Router from 'next/router';

export const path = () => {
    if(typeof window !== 'undefined') {
        return Router.router.asPath
    } else {
        return "/routerNotInstantiated"
    }
}

export const push = (path) => {
    if(typeof window !== 'undefined') {
        return Router.router.push(path)
    } else {
        return "**routerNotInstantiated**"
    }
}

export const getSearch = () => {
    if(typeof window !== 'undefined') {
        return window.location.search
    } else {
        return "?nowindowdefined"
    }
}

export const getPathname = () => {
    if(typeof window !== 'undefined') {
        return Router.pathname
    } else {
        return "no Router"
    }
}