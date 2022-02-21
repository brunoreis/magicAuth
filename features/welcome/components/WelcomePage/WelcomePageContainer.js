import { useSelector } from 'react-redux';

import { getUsername } from 'app/selectors';

import WelcomePage from './WelcomePage';

export default function WelcomePageContainer() {
  const username = useSelector(getUsername);
  return (
    <WelcomePage username={username} />
  );
}
