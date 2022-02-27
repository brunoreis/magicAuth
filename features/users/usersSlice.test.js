
import usersReducer, { receiveUsername, addUser } from './usersSlice';

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

  describe('addUser', () => {
    it('adds a new user if it does not exist', () => {
      let state = reducer({ users: [] }, addUser({ issuer: 'dude', email: 'dude@gmail.com'}))
      // console.log(state)//?
    })
  })
});

describe('actionCreators', () => {
  it('receiveUsername', () => exist(receiveUsername))
})
