import Layout, { HeaderContainer, FormContainer } from '../components/Layout';
import Header from '../components/Header'
import { FieldContainer, FieldLabel } from '../components/styles';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { MessageContainer } from './SignUpPage.styles.js'

export default function SignUpPage({ username, onUsernameChange, available, onButtonClick }) {
  return (
    <Layout title="Sign Up">
      <HeaderContainer>
        <Header>Sign Up</Header>
      </HeaderContainer>
      <FormContainer>
        <FieldLabel htmlFor="username">Pick a username</FieldLabel>
        <FieldContainer>
          <TextField testId="usernameInput" id="username" value={username} onChange={onUsernameChange}/>
        </FieldContainer>
        <Button onClick={onButtonClick}>Create Account</Button>
        <MessageContainer data-testid="message" available={available}>
          {
            ![false,true].includes(available) ? "" : available ? "✔ Available!" : "✘ Taken 🙁"
          }
        </MessageContainer>
      </FormContainer>
    </Layout>
  )
}