import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getSignInLoading from 'modules/authentication/selectors/global/getSignInLoading';


// import getIsLoggedIn from 'features/authentication/selectors/global/getIsLoggedIn';
// import { navigate } from 'features/navigation/slice/slice';

// const useNavigateToWelcomeIfLoggedInEffect = ({ dispatch }) => {
//   const isLoggedIn = useSelector(getIsLoggedIn);
//   useEffect(
//     () => isLoggedIn && dispatch(navigate({ path: WELCOME_ROUTE })),
//     [isLoggedIn]
//   );
// };

// useNavigateToWelcomeIfLoggedInEffect({ dispatch });


import {
  signIn,
} from '../../slice/authenticationSlice';
import SignInPage from './SignInPage';
import useDebouncedValidEmailErrorMessage from './useDebouncedValidEmailErrorMessage';
import usePreloadMagicLinkIFrameEffect from './usePreloadMagicLinkIFrameEffect';

const WELCOME_ROUTE = '/';

const SignInPageContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getSignInLoading);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  usePreloadMagicLinkIFrameEffect();

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
