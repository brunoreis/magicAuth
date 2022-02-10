import SignUpPageContainer from '../features/auth/SignUpPage/SignUpPageContainer'

export default function SignUp() {
  return (
    <SignUpPageContainer onButtonClick={(v) => console.log(v)}/>
  )
}
