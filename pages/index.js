import WelcomePageContainer from 'modules/welcome/components/WelcomePage/WelcomePageContainer'

export default function Welcome(props) {
  return (
    <WelcomePageContainer {...props}/>
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
