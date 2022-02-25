import WelcomePageContainer from 'features/welcome/components/WelcomePage/WelcomePageContainer'

export default function Welcome() {
  return (
    <WelcomePageContainer/>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      authentication: {
        requiresAuthentication: true,
      }
    }, 
  }
}
