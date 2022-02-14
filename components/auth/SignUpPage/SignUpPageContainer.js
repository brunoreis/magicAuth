import { useState } from 'react';
import SignUpPage from './SignUpPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUsernameIsAvailable } from '../../../app/selectors';
import { receiveUsernameThunk } from '../../../app/store'; // maybe I should use a saga here

export default function SignUpPageContainer() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const isAvailable = useSelector(getUsernameIsAvailable(username))
  return (
    <SignUpPage
      username={username}
      available={username ? isAvailable : null}
      onUsernameChange={setUsername}
      onButtonClick={() => {
        dispatch(receiveUsernameThunk(username));
      }}
    />
  );
}
