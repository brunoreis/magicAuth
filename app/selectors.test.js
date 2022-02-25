import {
  getUsernameIsAvailable,
  getSignInLoading,
  getCheckIsLoggedInLoading,
} from './selectors';

describe('getUsernameIsAvaliable', () => {
  it('getUsernameIsAvailable', () => {
    const state = {
      users: {
        users: [{ username: 'dude' }],
      },
    };
    expect(getUsernameIsAvailable('dude')(state)).toBe(false);
    expect(getUsernameIsAvailable('person')(state)).toBe(true);
  });
});

it('getShowLoader', () => {
  const state = {
    authentication: {
      checkIsLoggedInLoading: true,
    },
  };
  expect(getCheckIsLoggedInLoading(state)).toBe(true);
  state.authentication.checkIsLoggedInLoading = false;
  expect(getCheckIsLoggedInLoading(state)).toBe(false);
});

it('getSignInLoading', () => {
  const state = {
    authentication: {
      signInLoading: true,
    },
  };
  expect(getSignInLoading(state)).toBe(true);
});
