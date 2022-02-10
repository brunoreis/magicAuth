
import SignInPage from '../features/auth/SignInPage'

export default function SignIn() {
  return (
    <SignInPage onButtonClick={()=>console.log('button')} onEmailChange={(email) => console.log(email)}/>
  )
}
