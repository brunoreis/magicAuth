import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { navigate } from 'features/navigation/navigationSlice';

import getCheckIsLoggedInLoading from 'features/authentication/selectors/global/getCheckIsLoggedInLoading'
import getIsLoggedIn from 'features/authentication/selectors/global/getIsLoggedIn'
import getIssuer from 'features/authentication/selectors/global/getIssuer';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SIGNIN_ROUTE = '/signIn';

const redirectIfRequiresAuthenticationEffect = ({
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

const AuthenticationLoaderAndRedirectsHoc = (Component) => {
  return (props) => {
    console.log('AuthenticationLoaderAndRedirectsHoc', { props });
    const checkIsLoggedInLoading = useSelector(getCheckIsLoggedInLoading);
    const isLoggedIn = useSelector(getIsLoggedIn);
    const issuer = useSelector(getIssuer);
    const requiresAuthentication =
      props?.authenticationSettings?.requiresAuthentication || false;
    redirectIfRequiresAuthenticationEffect({
      checkIsLoggedInLoading,
      requiresAuthentication,
      isLoggedIn,
    });
    const passedProps = {
      ...props,
      authentication: {
        isLoggedIn,
        issuer,
      },
    };
    delete passedProps.authenticationSettings;

    const showLoader = checkIsLoggedInLoading && !isLoggedIn; //isLoggedIn may be true due to cached data
    return showLoader ? (
      <LoadingContainer>
        <Image src="/loader.gif" width="160px" height="120px" />
        checking user info..
      </LoadingContainer>
    ) : (
      <Component {...passedProps} />
    );
  };
};
export default AuthenticationLoaderAndRedirectsHoc;
