
import SignInPageContainer from 'modules/authentication/components/SignInPage/SignInPageContainer'

export default function SignIn() {
  return (
    <SignInPageContainer/>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      authenticationSettings: {
        requiresAuthentication: false,
      }
    }, 
  }
}
