
import SignInPageContainer from '../features/auth/SignInPage/SignInPageContainer'

export default function SignIn() {
  return (
    <SignInPageContainer onButtonClick={(v) => console.log(v)}/>
  )
}
