import usersReducer from './usersSlice';
import {
  signInSuccess,
  checkIsLoggedInReceived,
} from '../authentication/authenticationSlice';

const metadata = {
  email: 'testemail@a.com',
  issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
};
const storeWithMetadataUser = {
  users: [
    {
      email: 'testemail@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    },
  ],
};
const storeWithTwoUsers = {
  users: [
    {
      email: 'testemail2@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7==2',
    },
    {
      email: 'testemail@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    },
  ],
};
describe('users reducer', () => {
  describe('signInSuccess', () => {
    it('Given auth user data is not in the store, should create one', () => {
      let state = usersReducer(undefined, signInSuccess(metadata));
      expect(state).toEqual(storeWithMetadataUser);
      state = usersReducer(state, signInSuccess(metadata));
      expect(state.users.length).toBe(1);
    });
  });
  describe('checkIsLoggedInReceived', () => {
    it('Given auth user data is not in the store, should create one', () => {
      let state = usersReducer(undefined, checkIsLoggedInReceived(metadata));
      expect(state).toEqual(storeWithMetadataUser);
      state = usersReducer(state, signInSuccess(metadata));
      expect(state.users.length).toBe(1);
    });
  });
  // describe('receiveUsername', () => {
    // it('Should set the username in the actual logged user', () => {
    //   let state = usersReducer(
    //     storeWithTwoUsers,
    //     receiveUsername({
    //       username: 'dude',
    //       loggedUserIssuer:
    //         'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    //     })
    //   );
    //   expect(state.users[1].username).toEqual('dude');
    // });
  // });
});
