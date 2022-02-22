import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSignInLoading,
} from 'app/selectors';

import {
  signIn,
  preloadMagicLinkIFrame,
} from '../../authenticationSlice';

import SignInPage from './SignInPage';
import useDebouncedValidEmailErrorMessage from './useDebouncedValidEmailErrorMessage';


const SignInPageContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getSignInLoading);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => dispatch(preloadMagicLinkIFrame()),[]);

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
