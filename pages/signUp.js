import SignUpPageContainer from 'features/users/components/SignUpPage/SignUpPageContainer'

export default function SignUp() {
  return (
    <SignUpPageContainer onButtonClick={(v) => console.log(v)}/>
  )
}
