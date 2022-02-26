import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { navigate } from 'features/navigation/navigationSlice';
import { getUsername, getIsLoggedIn } from 'app/selectors';

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SIGNUP_ROUTE = '/signUp'

const redirectIfRequiresUsernameEffect = ({ isLoggedIn, hasUsername }) => {
    const dispatch = useDispatch();
    useEffect(
        () => {
            if(isLoggedIn && !hasUsername) {
                dispatch(navigate({ path: SIGNUP_ROUTE }))
            }
        },
        [isLoggedIn, hasUsername]
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