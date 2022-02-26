import SignUpPageContainer from 'features/users/components/SignUpPage/SignUpPageContainer'

export default function SignUp() {
  return (
    <SignUpPageContainer onButtonClick={(v) => console.log(v)}/>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      authenticationSettings: {
        requiresAuthentication: true,
      }
    }, 
  }
}
