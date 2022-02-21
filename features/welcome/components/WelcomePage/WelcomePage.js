import Layout, { HeaderContainer, FooterContainer } from 'components/Layout';
import Header from 'components/Header'
import { WelcomeIconContainer } from './WelcomePage.styles'
import Button from 'components/Button';
import { useDispatch } from 'react-redux';

import {
  logOut,
} from 'features/authentication/authenticationSlice';

export default function WelcomePage({ username }) {
  const dispatch = useDispatch();
  return (
    <Layout title="Welcome">
      <HeaderContainer>
        <Header>Welcome, {username}</Header>
      </HeaderContainer>
      <WelcomeIconContainer>
        🚀
      </WelcomeIconContainer>
      <FooterContainer>
        <Button light onClick={() => dispatch(logOut())}>Log Out</Button>        
      </FooterContainer>
    </Layout>
  )
}