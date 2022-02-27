import SignUpPageContainer from 'features/users/components/SignUpPage/SignUpPageContainer'

export default function SignUp(props) {
  return (
    <SignUpPageContainer {...props}/>
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
