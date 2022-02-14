import Router from 'next/router';

export const path = () => {
    if(Router.router) {
        return Router.router.asPath
    } else {
        return "/routerNotInstantiated"
    }
}

export const push = (path) => {
    if(Router.router) {
        return Router.router.push(path)
    } else {
        return "**routerNotInstantiated**"
    }
}