import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getPathname } from 'app/router';
import { navigate } from 'features/navigation/navigationSlice';
import { getUsername } from 'app/selectors';
import getIsLoggedIn from 'features/authentication/selectors/global/getIsLoggedIn'

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
        const isLoggedIn = useSelector(getIsLoggedIn);// this is now comming with the props
        const username = useSelector(getUsername); // we don't need this selector, but one that receives the issuer (decouple)
        const hasUsername = !!username;
        const passedProps = {
            ...props,
            users: {
                username
            }
        }
        redirectIfRequiresUsernameEffect({ isLoggedIn, hasUsername });
        return <Component {...passedProps}/>
    }
}