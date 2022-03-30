import Router from 'next/router';

export const path = () => {
    if(typeof window !== 'undefined' &&  Router.router) {
        return Router.router.asPath
    } else {
        return "/routerNotInstantiated"
    }
}

export const push = (path, callback) => {
    if(typeof window !== 'undefined' && Router.router) {
        return Router.router.push(path).then(callback)
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
    if(typeof window !== 'undefined' && Router.router) {
        return Router.pathname
    } else {
        return "no Router"
    }
}