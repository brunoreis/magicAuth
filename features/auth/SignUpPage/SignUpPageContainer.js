import { useState } from 'react'
import SignUpPage from './SignUpPage'

export default function SignUpPageContainer({ 
  onButtonClick
}) {
    const [username, setUsername] = useState("");
    const onButtonClickWithValues = () => onButtonClick({
        username, 
    })
    

  return (
    <SignUpPage
        username={username} 
        onUsernameChange={setUsername}
        onButtonClick={onButtonClickWithValues}
    />
  );
}
