import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { navigate } from 'modules/navigation/slice/slice';
import { getPathname } from 'modules/navigation/util/router';

import getCheckIsLoggedInLoading from './selectors/global/getCheckIsLoggedInLoading'
import getIsLoggedIn from './selectors/global/getIsLoggedIn'
import getIssuer from './selectors/global/getIssuer';
import getAuthUserEmail from './selectors/global/getAuthUserEmail';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SIGNIN_ROUTE = '/signIn';
const SIGNUP_ROUTE = '/signUp'
const ROOT_ROUTE = '/';

const redirectToSignInIfRequiresAuthenticationEffect = ({
  checkIsLoggedInLoading,
  requiresAuthentication,
  isLoggedIn,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!checkIsLoggedInLoading && requiresAuthentication && !isLoggedIn) {
      dispatch(navigate({ path: SIGNIN_ROUTE }));
    }
  }, [checkIsLoggedInLoading, requiresAuthentication, isLoggedIn]);
};

const redirectToWelcomeIfAuthenticatedEffect = ({
  checkIsLoggedInLoading,
  isLoggedIn,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const pathname = getPathname();
    console.log("redirectToWelcomeIfAuthenticatedEffect", { pathname })
    if (!checkIsLoggedInLoading && isLoggedIn && [SIGNUP_ROUTE, SIGNIN_ROUTE].includes(pathname)) {
      console.log({
        checkIsLoggedInLoading,
        isLoggedIn
      })
      dispatch(navigate({ path: ROOT_ROUTE }));
    }
  }, [checkIsLoggedInLoading, isLoggedIn]);
};

const AuthenticationLoaderAndRedirectsHoc = (Component) => {
  return (props) => {
    const checkIsLoggedInLoading = useSelector(getCheckIsLoggedInLoading);
    const isLoggedIn = useSelector(getIsLoggedIn);
    const issuer = useSelector(getIssuer);
    const email = useSelector(getAuthUserEmail);
    
    const requiresAuthentication =
    props?.authenticationSettings?.requiresAuthentication || false;
    redirectToSignInIfRequiresAuthenticationEffect({
      checkIsLoggedInLoading,
      requiresAuthentication,
      isLoggedIn,
    });
    // redirectToWelcomeIfAuthenticatedEffect({
    //   checkIsLoggedInLoading,
    //   isLoggedIn,
    // });

    const passedProps = {
      ...props,
      authentication: {
        isLoggedIn,
        issuer,
        email,
        checkIsLoggedInLoading,
      },
    };
    delete passedProps.authenticationSettings;    
    const showLoader = checkIsLoggedInLoading && !isLoggedIn;
    return showLoader ? (
      <LoadingContainer>
        <Image src="/loader.gif" width="160px" height="120px" />
        <span>checking user info..</span>
      </LoadingContainer>
    ) : (
      <Component {...passedProps} />
    );
  };
};
export default AuthenticationLoaderAndRedirectsHoc;
