import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getPathname } from 'app/router';
import { navigate } from 'features/navigation/navigationSlice';

import getUser from '../selectors/global/getUser';
import { addUser }  from '../usersSlice'

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
                dispatch(navigate({ path: SIGNUP_ROUTE }))
            }
            if(isLoggedIn && hasUsername && pathname === SIGNUP_ROUTE) {
                dispatch(navigate({ path: ROOT_ROUTE }))
            }
        },
        [isLoggedIn, hasUsername, pathname]
    )
}


export default function UsersRedirectsHoc(Component) {
    return (props) => {
        const { authentication } = props
        const dispatch = useDispatch();
        const issuer = authentication.issuer
        const email = authentication.email
        const isLoggedIn = authentication.isLoggedIn;
        const user = useSelector(getUser(issuer));
        const username = user?.username || null; 
        const hasUsername = !!username;
        redirectIfRequiresUsernameEffect({ isLoggedIn, hasUsername });
        if(!user) {
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