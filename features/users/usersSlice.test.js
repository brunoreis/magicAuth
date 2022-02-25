import {
  signInSuccess,
  checkIsLoggedInReceived,
} from '../authentication/authenticationSlice';
import usersReducer, { receiveUsername, receiveUsernameStart } from './usersSlice';

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
const reducer = usersReducer('users')
describe('users reducer', () => {
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
  describe('existent actionCreators', () => {
    it('receiveUsername', () => exist(receiveUsername))
    it('receiveUsernameStart', () => exist(receiveUsernameStart))
  })
});
