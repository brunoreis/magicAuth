import { useState } from 'react'
import SignInPage from './SignInPage'
import { useDispatch } from 'react-redux';
import {
  signIn,
} from '../../../features/auth/authSlice';

const SignInPageContainer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("bruno.p.reis@gmail.com");
  const [rememberMe, setRememberMe] = useState(false);

  const doLogIn = () => dispatch(
    signIn({
      email, 
      rememberMe
    })
  )
    

  return (
    <SignInPage
        email={email} 
        onEmailChange={setEmail}
        rememberMe={rememberMe} 
        onRememberMeToggle={() => setRememberMe(!rememberMe)} 
        onButtonClick={doLogIn}
    />
  );
}

export default SignInPageContainer;
