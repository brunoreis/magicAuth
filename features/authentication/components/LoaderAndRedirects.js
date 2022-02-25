import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Image from 'next/image'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { navigate } from 'features/navigation/navigationSlice';

import { getCheckIsLoggedInLoading, getIsLoggedIn } from 'app/selectors';

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SIGNIN_ROUTE = '/signIn'

const redirectIfRequiresAuthenticationEffect = ({ checkIsLoggedInLoading, requiresAuthentication, isLoggedIn }) => {
    const dispatch = useDispatch();
    useEffect(
        () => {
            if(!checkIsLoggedInLoading && requiresAuthentication && !isLoggedIn) {
                dispatch(navigate({ path: SIGNIN_ROUTE }))
            }
        },
        [checkIsLoggedInLoading, requiresAuthentication, isLoggedIn]
    )
}

export default function LoaderAndRedirects(props) {
    const checkIsLoggedInLoading = useSelector(getCheckIsLoggedInLoading);
    const isLoggedIn = useSelector(getIsLoggedIn);
    const requiresAuthentication = props.authentication.requiresAuthentication;
    redirectIfRequiresAuthenticationEffect({ checkIsLoggedInLoading, requiresAuthentication, isLoggedIn })
    const showLoader = checkIsLoggedInLoading && !isLoggedIn //isLoggedIn may be true due to cached data
    return showLoader ? (
        <LoadingContainer>
            <Image src="/loader.gif" width="160px" height="120px"/>
            checking user info..
        </LoadingContainer> 
    ) : (
        props.children
    );
}