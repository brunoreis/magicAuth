const findUser = (store, issuer) => store.users.users.find((user)=> user.issuer === issuer)

export const getIssuer = (state) => state.authentication.issuer;

export const getUsername = (state) => {
  const loggedUserIssuer = getIssuer(state)
  const user = findUser(state, loggedUserIssuer)
  return user?.username || null
}

export const getIsLoading = (state) => state.app.loading