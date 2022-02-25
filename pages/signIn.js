
import SignInPageContainer from 'features/authentication/components/SignInPage/SignInPageContainer'

export default function SignIn() {
  return (
    <SignInPageContainer/>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      authentication: {
        requiresAuthentication: false,
      }
    }, 
  }
}
