import WelcomePage from './WelcomePage';
import { useSelector } from 'react-redux';
import { getUsername } from '../../../app/store';

export default function WelcomePageContainer() {
  const username = useSelector(getUsername);
  return (
    <WelcomePage username={username} />
  );
}
