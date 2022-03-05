import WelcomePage from './WelcomePage';

export default function WelcomePageContainer(props) {
  const username = props?.users?.username;
  return (
    <WelcomePage username={username} />
  );
}
