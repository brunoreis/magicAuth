import { useState } from 'react';
import SignInPage from './SignInPage';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../../features/authentication/authenticationSlice';
import { getLoading } from '../../../app/selectors';

const SignInPageContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading('authentication'))
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const doLogIn = () => {
    const payload = {
      email,
      rememberMe,
      redirectUrl: `http://${document.location.host}/`
    }
    dispatch(signIn(payload));
  };

  const canSubmit = !!email

  return (
    <SignInPage
      email={email}
      onEmailChange={setEmail}
      rememberMe={rememberMe}
      onRememberMeToggle={() => setRememberMe(!rememberMe)}
      onButtonClick={doLogIn}
      canSubmit={canSubmit}
      loading={loading}
    />
  );
};

export default SignInPageContainer;
