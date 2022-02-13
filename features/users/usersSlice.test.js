import usersReducer from './usersSlice';
import { signInSuccess, checkIsLoggedInReceived } from '../authentication/authenticationSlice';

describe('users reducer', () => {
  describe('signInSuccess', () => {
    it('Given auth user data is not in the store, should create one', () => {
      const metadata = {
        email: 'testemail@a.com',
        issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
      };
      let state = usersReducer(undefined, signInSuccess(metadata));
      expect(state).toEqual({
        users: [
          {
            email: 'testemail@a.com',
            issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
          },
        ],
      });
      state = usersReducer(state, signInSuccess(metadata));
      expect(state.users.length).toBe(1)
    });
  });
  describe('checkIsLoggedInReceived', () => {
    it('Given auth user data is not in the store, should create one', () => {
      const metadata = {
        email: 'testemail@a.com',
        issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
      };
      let state = usersReducer(undefined, checkIsLoggedInReceived(metadata));
      expect(state).toEqual({
        users: [
          {
            email: 'testemail@a.com',
            issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
          },
        ],
      });
      state = usersReducer(state, signInSuccess(metadata));
      expect(state.users.length).toBe(1)
    });
  });
});
