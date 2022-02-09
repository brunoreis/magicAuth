import Layout, { HeaderContainer, FormContainer, FooterContainer } from '../components/Layout';
import Header from '../components/Header';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import { FieldContainer, FieldLabel, ToggleLabelContainer } from './SignInPage.styles';

export default function SignIn() {
  return (
    <Layout title="Sign In">
      <HeaderContainer>
        <Header>Sign In</Header>
      </HeaderContainer>
      <FormContainer>
        <FieldLabel htmlFor="email">Your Email</FieldLabel>
        <FieldContainer>
          <TextField testId="emailInput" id="email" />
        </FieldContainer>
        <Button>Sign In / Sign Up</Button>
      </FormContainer>
      <FooterContainer>
        <ToggleLabelContainer>
          <FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
        </ToggleLabelContainer>
        <Toggle
          id="rememberMe"
          defaultChecked={true}
          icons={false}
          onChange={() => {}}
        />
      </FooterContainer>
    </Layout>
  );
}
