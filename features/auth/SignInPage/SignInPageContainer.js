import { useState } from 'react'
import SignInPage from './SignInPage'

export default function SignInPageContainer({ 
  onButtonClick
}) {
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const onButtonClickWithValues = () => onButtonClick({
        email, 
        rememberMe
    })
    

  return (
    <SignInPage
        email={email} 
        onEmailChange={setEmail}
        rememberMe={rememberMe} 
        onRememberMeToggle={() => setRememberMe(!rememberMe)} 
        onButtonClick={onButtonClickWithValues}
    />
  );
}
