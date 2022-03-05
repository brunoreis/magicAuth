import { render as tlRender, screen } from '@testing-library/react';
import * as R from 'ramda';

import { addTheme, addReduxProvider } from 'util/testHelpers';
import { checkIsLoggedInStarted } from 'features/authentication/authenticationSlice';
import addStoreBroadcasting from 'util/testHelpers/addStoreBroadcasting';

import AuthenticationLoaderAndRedirectsHoc from './AuthenticationLoaderAndRedirectsHoc';

const render = R.compose(tlRender, addTheme, addReduxProvider);

const WrappedComponent = () => <span>WrappedComponent</span>;
const Component = addStoreBroadcasting(
  AuthenticationLoaderAndRedirectsHoc(WrappedComponent)
);

it('Given the user is not logged in and checkIsLoggedInLoading is true, should show loader with "checking user info.." text and not show the wrapped component.', async () => {
  let store = null;
  render(<Component broadCastStore={(innerStore) => (store = innerStore)} />);
  store.dispatch(checkIsLoggedInStarted({}));
  expect(screen.getByText('checking user info..')).toBeTruthy();
  expect(screen.queryByText('WrappedComponent')).toBe(null);
});

it('Given the user is not logged in and checkIsLoggedInLoading is false, should show the wrapped component.', async () => {
    render(<Component/>)
    expect(screen.queryByText('checking user info..')).toBe(null)
    expect(screen.queryByText('WrappedComponent')).toBeTruthy()
})

it('Given the page requires authentication, user is not logged and checkIsLoggedInLoading is false should redirect to sign in (dispatch a nav action).', async () => {
  let store = null;
  render(<Component authenticationSettings={{ requiresAuthentication: true }} broadCastStore={(innerStore) => (store = innerStore)}/>)
  expect(screen.queryByText('checking user info..')).toBe(null)
  expect(screen.queryByText('WrappedComponent')).toBeTruthy()
  expect(store.getState().lastActionForTestingPurposes.type).toBe('nav/signIn')
})

