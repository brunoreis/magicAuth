import { useState } from 'react';
import SignUpPage from './SignUpPage';
import { useDispatch } from 'react-redux';
import { receiveUsernameThunk } from '../../../app/store'; // maybe I should use a saga here

export default function SignUpPageContainer() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  return (
    <SignUpPage
      username={username}
      onUsernameChange={setUsername}
      onButtonClick={() => {
        dispatch(receiveUsernameThunk(username));
      }}
    />
  );
}
