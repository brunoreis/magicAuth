import {
  getUsernameIsAvailable,
  getSignInLoading,
  getShowLoader,
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
      showLoader: true,
    },
  };
  expect(getShowLoader(state)).toBe(true);
  state.authentication.showLoader = false;
  expect(getShowLoader(state)).toBe(false);
});

it('getSignInLoading', () => {
  const state = {
    authentication: {
      signInLoading: true,
    },
  };
  expect(getSignInLoading(state)).toBe(true);
});
