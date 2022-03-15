import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getSignInLoading from 'features/authentication/selectors/global/getSignInLoading';
import getIsLoggedIn from  'features/authentication/selectors/global/getIsLoggedIn';
import { navigate } from 'features/navigation/navigationSlice';

import { signIn, preloadMagicLinkIFrame } from '../../authenticationSlice';
import SignInPage from './SignInPage';
import useDebouncedValidEmailErrorMessage from './useDebouncedValidEmailErrorMessage';

const WELCOME_ROUTE = '/';

const useNavigateToWelcomeIfLoggedInEffect = ({ dispatch }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  useEffect(
    () => isLoggedIn && dispatch(navigate({ path: WELCOME_ROUTE })),
    [isLoggedIn]
  );
};

const usePreloadMagicLinkIFrameEffect = ({ dispatch }) => {
  useEffect(() => dispatch(preloadMagicLinkIFrame()), []);
};

const SignInPageContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getSignInLoading);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useNavigateToWelcomeIfLoggedInEffect({ dispatch });
  usePreloadMagicLinkIFrameEffect({ dispatch });

  const errorMessage = useDebouncedValidEmailErrorMessage(email);

  const doLogIn = () => {
    const payload = {
      email,
      rememberMe,
      redirectURI: `${document.location.protocol}//${document.location.host}/`,
    };
    dispatch(signIn(payload)); 
  };

  const canSubmit = !!email;

  return (
    <SignInPage
      email={email}
      onEmailChange={setEmail}
      rememberMe={rememberMe}
      onRememberMeToggle={() => setRememberMe(!rememberMe)}
      onButtonClick={doLogIn}
      canSubmit={canSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};

export default SignInPageContainer;
