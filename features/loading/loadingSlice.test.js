import loadingReducer from './loadingSlice';
import {
  signIn,
  signInFailure,
  signInSuccess,
} from '../authentication/authenticationSlice';

describe('loading reducer', () => {
  describe('authentication', () => {
    it('start as false', () => {
      let state = loadingReducer(undefined, {type:""});
      expect(state).toEqual({ authentication: false});
    });
    it('signIn set loading to true', () => {
      let state = loadingReducer(undefined, signIn({}));
      expect(state).toEqual({ authentication: true});
    });
    it('singInFailure set loading to false', () => {
      let state = loadingReducer({authentication: true}, signInFailure({}));
      expect(state).toEqual({ authentication: false});
    });
    it('singInSuccess set loading to false', () => {
      let state = loadingReducer({authentication: true}, signInSuccess({}));
      expect(state).toEqual({ authentication: false});
    });
  });
});
