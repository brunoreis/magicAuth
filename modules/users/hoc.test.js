import { render as tlRender, screen } from '@testing-library/react';
import * as R from 'ramda';

import { addTheme } from 'util/testHelpers';
import addReduxProvider from 'util/testHelpers/addReduxProvider';
import { buildStore } from 'app/store';

import { addUser, receiveUsername } from './slice/usersSlice';

let pathname = 'mock';
jest.mock('modules/navigation/util/router', () => ({
  ...jest.requireActual('modules/navigation/util/router'),
  getPathname: () => pathname,
}));
import getNavigatingTo from 'modules/navigation/selectors/global/getNavigatingTo';

import UsersRedirectsHoc from './hoc';

const render = R.compose(tlRender, addTheme);
const WrappedComponent = () => <span>WrappedComponent</span>;
const Component = R.compose(
  addReduxProvider,
  UsersRedirectsHoc
)(WrappedComponent);

describe("hoc", () => {
  it('Given isLogged in and not has username, redirects to signup (if not yet there).', async () => {
    const store = buildStore();
    pathname = '/otherThanSignup';
    render(
      <Component
        store={store}
        authentication={{ isLoggedIn: true, issuer: null, email: null }}
      />
    );
    expect(getNavigatingTo(store.getState())).toBe('/signUp');
  });
  
  it('Given isLogged, has username, and is in the signup page, redirects to root.', async () => {
    pathname = '/signUp';
    const store = buildStore();
    store.dispatch(addUser({ issuer: 'dude', email: 'dude@dude.com' }));
    store.dispatch(receiveUsername({ issuer: 'dude', username: 'thedude' }));
    render(
      <Component
        store={store}
        authentication={{ isLoggedIn: true, issuer: 'dude', email: null }}
      />
    );
    const lastAction = store.getState().lastActionForTestingPurposes;
    expect(getNavigatingTo(store.getState())).toBe('/');
  });
  
  it('Renders the passed component.', async () => {
    const store = buildStore();
    render(<Component store={store} authentication={{ issuer: null }} />);
    expect(screen.queryByText('WrappedComponent')).toBeTruthy();
  });  
})
