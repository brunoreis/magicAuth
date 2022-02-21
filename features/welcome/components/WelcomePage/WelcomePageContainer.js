import WelcomePage from './WelcomePage';
import { useSelector } from 'react-redux';
import { getUsername } from 'app/selectors';

export default function WelcomePageContainer() {
  const username = useSelector(getUsername);
  return (
    <WelcomePage username={username} />
  );
}
