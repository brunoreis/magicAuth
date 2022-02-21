import * as authenticationSlice from '../features/authentication/authenticationSlice';

const findUser = (store, issuer) => store.users.users.find((user)=> user.issuer === issuer)

export const getIssuer = (state) => authenticationSlice.getIssuer(state.authentication)

export const getUsername = (state) => {
  const loggedUserIssuer = getIssuer(state)
  const user = findUser(state, loggedUserIssuer)
  return user?.username || null
}

export const getUsernameIsAvailable = (username) => (state) => {
  const found = !!state.users.users.find( (user)=> user.username === username )
  return !found
}

export const getLoading = (key) => (state) => state.loading[key]
