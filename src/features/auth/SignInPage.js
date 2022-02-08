import Layout from './components/Layout';
import Header from './components/Header';
import TextField from './components/TextField';
import Button from './components/Button';

export default function SignIn() {
  return (
    <Layout title="Sign In">
      <Header>Sign In</Header>
      <label htmlFor="email">
        Your Email
      </label>
      <TextField
        testId="emailInput"
        id="email"
      />
      <Button>
        Sign In / Sign Up
      </Button>
    </Layout>
  );
}
