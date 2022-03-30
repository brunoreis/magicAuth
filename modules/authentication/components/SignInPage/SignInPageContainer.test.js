import { render as tlRender, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as R from 'ramda';

import { addTheme } from 'util/testHelpers';
import addReduxProvider from 'util/testHelpers/addReduxProvider';
import getRememberMe from 'modules/authentication/selectors/global/getRememberMe';
import { buildStore } from 'modules/app/store';

import getCheckIsLoggedInLoading from '../../selectors/global/getCheckIsLoggedInLoading';
import getIsLoggedIn from '../../selectors/global/getIsLoggedIn';
import getIssuer from '../../selectors/global/getIssuer';
import getAuthUserEmail from '../../selectors/global/getAuthUserEmail';

import SignInPageContainer from './SignInPageContainer';

const render = R.compose(tlRender, addTheme);
const Component = R.compose(addReduxProvider)(SignInPageContainer);
const waitForWatcherToBeReady = (miliseconds) =>
  new Promise((resolve) => setTimeout(resolve, miliseconds));
jest.setTimeout(50000);

let mockLoginWithMagicLink = jest.fn();
let mockGetMetadata = jest.fn();
const metadataMockedResponse = {
  email: 'dude@gmail.com',
  isMfaEnabled: false,
  issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
  phoneNumber: null,
  publicAddress: '0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
};
mockGetMetadata.mockReturnValueOnce(metadataMockedResponse);

jest.mock('modules/authentication/util/magic', () => {
  return {
    auth: {
      loginWithMagicLink: (...params) => mockLoginWithMagicLink(...params),
    },
    user: {
      getMetadata: (...params) => mockGetMetadata(...params),
    },
  };
});

describe('SignInPageContainer', () => {
  it('Should sign in the user when email is entered and the button is pressed.', async () => {
    const email = 'bruno.p.reis@gmail.com';
    const store = buildStore();
    render(<Component store={store} />);
    userEvent.type(screen.getByLabelText('Your Email'), email);
    userEvent.click(screen.getByLabelText('Remember me'));
    await waitForWatcherToBeReady(50);
    userEvent.click(screen.getByRole('button'));
    const rememberMeStoreValue = getRememberMe(store.getState());
    expect(mockLoginWithMagicLink).toHaveBeenCalledWith(
      { email, redirectURI: 'http://localhost/' },
      true
    );
    expect(mockGetMetadata).toHaveBeenCalled();
    expect(rememberMeStoreValue).toBe(true);
    const state = store.getState();
    await waitFor(() => expect(getIsLoggedIn(state)).toBe(true));
    expect(getCheckIsLoggedInLoading(state)).toBe(false);
    expect(getIssuer(state)).toBe(metadataMockedResponse.issuer);
    expect(getAuthUserEmail(state)).toBe(metadataMockedResponse.email);
  });
});
