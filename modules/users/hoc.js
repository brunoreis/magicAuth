import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getPathname } from 'modules/navigation/util/router';
import { navigate } from 'modules/navigation/slice/slice';

import getUser from './selectors/global/getUser';
import { addUser }  from './slice/usersSlice'

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SIGNUP_ROUTE = '/signUp'
const ROOT_ROUTE = '/'

const redirectIfRequiresUsernameEffect = ({ isLoggedIn, hasUsername }) => {
    const dispatch = useDispatch();
    const pathname = getPathname();
    useEffect(
        () => {
            if(isLoggedIn && !hasUsername && pathname !== SIGNUP_ROUTE) {
                // add some extra info to the action
                dispatch(navigate({ path: SIGNUP_ROUTE }))
            }
            if(isLoggedIn && hasUsername && pathname === SIGNUP_ROUTE) {
                // add some extra info to the action
                dispatch(navigate({ path: ROOT_ROUTE }))
            }
        },
        [isLoggedIn, hasUsername, pathname]
    )
}


export default function UsersRedirectsHoc(Component) {
    return (props) => {
        const { authentication } = props //?
        const dispatch = useDispatch();
        const issuer = authentication.issuer
        const email = authentication.email
        const isLoggedIn = authentication.isLoggedIn;
        const user = useSelector(getUser(issuer));
        const username = user?.username || null; 
        const hasUsername = !!username;
        redirectIfRequiresUsernameEffect({ isLoggedIn, hasUsername });
        if(!user && issuer) {
            dispatch(addUser({ issuer, email }))
        }
        const passedProps = {
            ...props,
            users: {
                username
            }
        }
        return <Component {...passedProps}/>
    }
}