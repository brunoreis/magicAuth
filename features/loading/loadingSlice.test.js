import loadingReducer, { applicationLoaded } from './loadingSlice';
import {
  signIn,
  signInFailure,
  signInSuccess,
} from '../authentication/authenticationSlice';


describe('loading reducer', () => {
  describe('authentication', () => {
    it('start as false', () => {
      let state = loadingReducer(undefined, {type:""});
      expect(state.authentication).toBe(false);
    });
    it('signIn set loading to true', () => {
      let state = loadingReducer(undefined, signIn({}));
      expect(state.authentication).toBe(true);
    });
    it('singInFailure set loading to false', () => {
      let state = loadingReducer({authentication: true}, signInFailure({}));
      expect(state.authentication).toBe(false);
    });
    it('singInSuccess set loading to false', () => {
      let state = loadingReducer({authentication: true}, signInSuccess({}));
      expect(state.authentication).toBe(false);
    });
  });
  describe('app', () => {
    it('has loading true as initial state', () => {
      let state = loadingReducer(undefined, {});
      expect(state.app).toBe(true);
    })
    describe('applicationLoaded', ()=> {
      it('set loading to false on redirectsCompleted', () => {
        let state = loadingReducer({ app: true }, applicationLoaded());
        expect(state.app).toBe(false)
      });
    })
  })
});
