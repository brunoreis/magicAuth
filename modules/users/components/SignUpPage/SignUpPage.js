import Layout, { HeaderContainer, FormContainer } from 'components/Layout';
import Header from 'components/Header';
import { FieldContainer, FieldLabel } from 'components/styles';
import TextField from 'modules/visualComponents/components/TextField';
import Button from 'modules/visualComponents/components/Button';
import buildOnEnterKeyDown from 'components/buildOnEnterKeyDown';

import { MessageContainer } from './SignUpPage.styles.js';

export default function SignUpPage({
  username,
  onUsernameChange,
  available,
  onButtonClick,
  canSubmit,
}) {
  return (
    <Layout title="Sign Up">
      <HeaderContainer>
        <Header>Sign Up</Header>
      </HeaderContainer>
      <FormContainer>
        <FieldLabel htmlFor="username">Pick a username</FieldLabel>
        <FieldContainer>
          <TextField
            testId="usernameInput"
            id="username"
            value={username}
            onChange={onUsernameChange}
            onKeyDown={buildOnEnterKeyDown(enterKeyWasPressed => {
              enterKeyWasPressed && onButtonClick()}
            )}
          />
        </FieldContainer>
        <Button onClick={onButtonClick} disabled={!canSubmit}>
          Create Account
        </Button>
        <MessageContainer data-testid="message" available={available}>
          {![false, true].includes(available)
            ? ''
            : available
            ? '✔ Available!'
            : '✘ Taken 🙁'}
        </MessageContainer>
      </FormContainer>
    </Layout>
  );
}
