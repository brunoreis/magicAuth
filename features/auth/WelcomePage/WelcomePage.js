import Layout, { HeaderContainer } from '../components/Layout';
import Header from '../components/Header'
import { WelcomeIconContainer } from './WelcomePage.styles'

export default function WelcomePage({ username }) {
  return (
    <Layout title="Welcome">
      <HeaderContainer>
        <Header>Welcome, {username}</Header>
      </HeaderContainer>
      <WelcomeIconContainer>
        🚀
      </WelcomeIconContainer>
      
    </Layout>
  )
}