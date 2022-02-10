import { useState, useEffect } from 'react'
import SignInPage from './SignInPage'
import { Magic } from 'magic-sdk';

const usePreloadMagicLinkAssetsEffect = () => {
  let magic;
  useEffect(
    async () => {
      magic = new Magic('pk_live_DAD57FAA0FFD246C'); 
      await magic.preload()  
      console.log('Magic <iframe> loaded.')
      const isLoggedIn = await magic.user.isLoggedIn
      if(isLoggedIn) {
        console.log("Is logged in, logging out")
        const loggedInIdToken = await magic.user.getIdToken()
        console.log('Logged in as', loggedInIdToken)
        await magic.user.logout()
        console.log('logged out...')
      }
      console.log('log in...')
      const idToken = await magic.auth.loginWithMagicLink({ email: 'bruno.p.reis@gmail.com'}, true);
      console.log({ idToken })
    },
    []
  )
  return magic
}


const SignInPageContainer = ({ 
  onButtonClick
}) => {
  usePreloadMagicLinkAssetsEffect()
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

export default SignInPageContainer;
