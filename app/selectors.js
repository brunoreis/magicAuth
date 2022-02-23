import * as authenticationSlice from '../features/authentication/authenticationSlice';

const findUser = (store, issuer) => store.users.users.find((user)=> user.issuer === issuer)

const key = 'authentication'
export const getSignInLoading = (state) => authenticationSlice.getSignInLoading(state[key]);
export const getIssuer = (state) => authenticationSlice.getIssuer(state[key]);
export const getRememberMe = (state) => authenticationSlice.getRememberMe(state[key]);
export const getShowLoader = (state) => authenticationSlice.getShowLoader(state[key])



export const getUsername = (state) => {
  const loggedUserIssuer = getIssuer(state)
  const user = findUser(state, loggedUserIssuer)
  return user?.username || null
}

export const getUsernameIsAvailable = (username) => (state) => {
  const found = !!state.users.users.find( (user)=> user.username === username )
  return !found
}

