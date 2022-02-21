import Layout, { HeaderContainer, FormContainer, FooterContainer } from 'components/Layout';
import Header from 'components/Header';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import { FieldContainer, FieldLabel } from 'components/styles';
import { ToggleLabelContainer, ErrorMessage } from './SignInPage.styles';
import buildOnEnterKeyDown from 'components/buildOnEnterKeyDown';

export default function SignInPage({ 
  email, 
  rememberMe,
  onEmailChange, 
  onButtonClick, 
  onRememberMeToggle,
  canSubmit, 
  loading,
  errorMessage,
}) {
  
  return (
    <Layout title="Sign In">
      <HeaderContainer>
        <Header>Sign In</Header>
      </HeaderContainer>
      <FormContainer>
        <FieldLabel htmlFor="email">Your Email</FieldLabel>
        <FieldContainer>
          <TextField 
            testId="emailInput" 
            id="email" 
            value={email} 
            onChange={onEmailChange} 
            onKeyDown={buildOnEnterKeyDown(enterKeyWasPressed => {
              enterKeyWasPressed && onButtonClick()}
            )}
          />
        </FieldContainer>
        <Button 
          onClick={onButtonClick} 
          disabled={!canSubmit} 
          loading={loading}
        >Sign In / Sign Up</Button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormContainer>
      <FooterContainer>
        <ToggleLabelContainer>
          <FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
        </ToggleLabelContainer>
        <Toggle
          id="rememberMe"
          checked={rememberMe}
          icons={false}
          onChange={onRememberMeToggle}
        />
      </FooterContainer>
    </Layout>
  );
}
