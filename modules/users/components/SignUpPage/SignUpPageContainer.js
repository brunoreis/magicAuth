import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { navigate } from 'modules/navigation/slice/slice';

import getUsernameIsAvailable from '../../selectors/global/getUsernameIsAvailable';
import { receiveUsername } from '../../slice/usersSlice';
import SignUpPage from './SignUpPage';

const WELCOME_URL = '/'

export default function SignUpPageContainer(props) {
  const issuer = props.authentication.issuer;
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const isAvailable = useSelector(getUsernameIsAvailable(username));
  const canSubmit = isAvailable && !!username;
  return (
    <SignUpPage
      username={username}
      available={(username && !saving) ? isAvailable : null}
      onUsernameChange={setUsername}
      canSubmit={canSubmit}
      onButtonClick={() => {
        setSaving(true)
        dispatch(receiveUsername({ issuer, username }));
        dispatch(navigate(WELCOME_URL));
      }}
    />
  );
}
