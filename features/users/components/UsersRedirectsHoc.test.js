import { render as tlRender, screen } from '@testing-library/react';
import * as R from 'ramda';

import { addTheme } from 'util/testHelpers';
import addReduxProvider from "util/testHelpers/addReduxProvider";
import { buildStore } from 'app/store';

import { addUser, receiveUsername }  from '../usersSlice'

let pathname = 'mock';
jest.mock('app/router', () => ({
    ... jest.requireActual('app/router'),
    getPathname: () => pathname
}))

import UsersRedirectsHoc from './UsersRedirectsHoc';

const render = R.compose(tlRender, addTheme);
const WrappedComponent = () => <span>WrappedComponent</span>;
const Component = R.compose(addReduxProvider, UsersRedirectsHoc )(WrappedComponent)

it('Given isLogged in and not has username, redirects to signup (if not yet there).', async () => {
  const thisStore = buildStore();
  pathname = '/otherThanSignup'
  render(<Component store={thisStore} authentication={{ isLoggedIn: true, issuer: null, email: null }}/>);
  expect(thisStore.getState().lastActionForTestingPurposes.type).toBe('nav/signUp')
});

it('Given isLogged, has username, and is in the signup page, redirects to root.', async () => {
    pathname = '/signUp'
    const thisStore = buildStore();
    thisStore.dispatch(addUser({ issuer: 'dude' , email: 'dude@dude.com' }))
    thisStore.dispatch(receiveUsername({ issuer: 'dude' , username: 'thedude' }))
    render(<Component store={thisStore} authentication={{ isLoggedIn: true, issuer: 'dude', email: null }} />);
    const lastAction = thisStore.getState().lastActionForTestingPurposes;
    expect(lastAction.type).toBe('nav/')
  });

  it('Renders the passed component.', async () => {
    render(<Component authentication={{ issuer: null }} />);
    expect(screen.queryByText('WrappedComponent')).toBeTruthy();
  });
