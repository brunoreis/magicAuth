import loadingReducer, { applicationLoaded } from './loadingSlice';

describe('loading reducer', () => {
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
