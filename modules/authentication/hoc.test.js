import { render as tlRender, screen } from '@testing-library/react';
import * as R from 'ramda';

import { buildStore } from 'app/store';
import { addTheme } from 'util/testHelpers';
import addReduxProvider from 'util/testHelpers/addReduxProvider';
import { checkIsLoggedInStarted } from 'modules/authentication/slice/authenticationSlice';
import getNavigatingTo from 'modules/navigation/selectors/global/getNavigatingTo';

import AuthenticationLoaderAndRedirectsHoc from './hoc';

let pathname = 'mock';
jest.mock('modules/navigation/util/router', () => ({
  ...jest.requireActual('modules/navigation/util/router'),
  getPathname: () => pathname,
}));

const render = R.compose(tlRender, addTheme);

const WrappedComponent = () => <span>WrappedComponent</span>;
const Component = R.compose(
  addReduxProvider,
  AuthenticationLoaderAndRedirectsHoc
)(WrappedComponent);

describe('hoc', () => {
  it('Given the user is not logged in and checkIsLoggedInLoading is true, should show loader with "checking user info.." text and not show the wrapped component.', async () => {
    let store = buildStore();
    render(<Component store={store} />);
    store.dispatch(checkIsLoggedInStarted({}));
    expect(screen.getByText('checking user info..')).toBeTruthy();
    expect(screen.queryByText('WrappedComponent')).toBe(null);
  });
  
  it('Given the user is not logged in and checkIsLoggedInLoading is false, should show the wrapped component.', async () => {
    let store = buildStore({ authentication: {checkIsLoggedInLoading: false}});
    render(<Component store={store} />);
    expect(screen.queryByText('checking user info..')).toBe(null);
    expect(screen.queryByText('WrappedComponent')).toBeTruthy();
  });
  
  it('Given the page requires authentication, user is not logged and checkIsLoggedInLoading is false should redirect to sign in (dispatch a nav action).', async () => {
    const store = buildStore({ authentication: {checkIsLoggedInLoading: false}});
    render(
      <Component
        store={store}
        authenticationSettings={{ requiresAuthentication: true }}
      />
    );
    expect(screen.queryByText('checking user info..')).toBe(null);
    expect(screen.queryByText('WrappedComponent')).toBeTruthy();
    expect(getNavigatingTo(store.getState())).toBe('/signIn');
  });
  
})
