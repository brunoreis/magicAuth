import { useState } from 'react';
import SignInPage from './SignInPage';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../features/authentication/authenticationSlice';

const SignInPageContainer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const doLogIn = () => {
    const payload = {
      email,
      rememberMe,
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
    />
  );
};

export default SignInPageContainer;
