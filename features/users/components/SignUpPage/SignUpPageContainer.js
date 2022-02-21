import { useState } from 'react';
import SignUpPage from './SignUpPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUsernameIsAvailable } from 'app/selectors';
import { receiveUsernameStart } from '../../usersSlice'; //????

export default function SignUpPageContainer() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const isAvailable = useSelector(getUsernameIsAvailable(username))
  const canSubmit = isAvailable && !!username;
  return (
    <SignUpPage
      username={username}
      available={username ? isAvailable : null}
      onUsernameChange={setUsername}
      canSubmit={canSubmit}
      onButtonClick={() => {
        dispatch(receiveUsernameStart(username));
      }}
    />
  );
}
