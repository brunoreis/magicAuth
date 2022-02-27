import {
  signInSuccess,
  checkIsLoggedInReceived,
} from '../authentication/authenticationSlice';
import usersReducer, { receiveUsername } from './usersSlice';

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

const exist = (actionCreator) => { // this should go in some kind of testHelpers file/folder
  actionCreator()
}

const reducer = usersReducer
describe('users reducer', () => {

  describe('receiveUsername', () => {
    it('Sets the username in the user with the provided issuer', () => {
      const issuer1 = 'xpto1'
      const username1 = 'username1'
      const issuer2 = 'xpto2'
      const username2 = 'username2'
      const newUsername = 'newUsername'
      let state = {
        users: [
          { issuer: issuer1, username: username1 },
          { issuer: issuer2, username: username2 },
        ]
      }
      state = reducer(state, receiveUsername({ issuer: issuer2, username: newUsername}));
      expect(state.users[0].username).toBe(username1);
      expect(state.users[1].issuer).toBe(issuer2);
      expect(state.users[1].username).toBe(newUsername);
    });
  })

  describe('signInSuccess', () => {
    it('Given auth user data is not in the store, should create one', () => {
      let state = reducer(undefined, signInSuccess(metadata));
      expect(state).toEqual(storeWithMetadataUser);
      state = reducer(state, signInSuccess(metadata));
      expect(state.users.length).toBe(1);
    });
  });

  describe('checkIsLoggedInReceived', () => {
    it('Given auth user data is not in the store, should create one', () => {
      let state = reducer(undefined, checkIsLoggedInReceived(metadata));
      expect(state).toEqual(storeWithMetadataUser);
      state = reducer(state, signInSuccess(metadata));
      expect(state.users.length).toBe(1);
    });
  });
});

describe('actionCreators', () => {
  it('receiveUsername', () => exist(receiveUsername))
})
