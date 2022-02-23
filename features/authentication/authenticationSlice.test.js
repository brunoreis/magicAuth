import authenticationReducer, {
  signInSuccess,
  checkIsLoggedInReceived,
  signIn,
  signInFailure,
  logOut,
  logOutSuccess,
  checkIsLoggedInStarted,
  hideLoader,
  getIsLoggedIn,
  getIssuer,
  getRememberMe,
  getSignInLoading,
  getShowLoader,
  preloadMagicLinkIFrame,
  preloadMagicLinkIFrameStarted
} from './authenticationSlice';


const exist = (actionCreator) => {
  actionCreator()
}

const reducer = authenticationReducer('authentication')

it('should handle initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    issuer: null,
    rememberMe: false,
    signInLoading: false,
    showLoader: true,
  });
});

describe('selectors', () => {
  it('getIsLoggedIn', () => {
    const state = reducer(undefined, {})
    expect(getIsLoggedIn(state)).toBe(false)
  })
  it('getSignInLoading', () => {
    const state = reducer(undefined, {})
    expect(getSignInLoading(state)).toBe(false)
  })
  it('getIssuer', () => {
    const issuer = 'dude'
    const state = reducer({ issuer }, {})
    expect(getIssuer(state)).toBe(issuer)
  })
  it('getRememberMe', () => {
    const state = reducer({ rememberMe: true }, {})
    expect(getRememberMe(state)).toBe(true)
  })
})

describe('existent actionCreators', () => {
  it('signInSuccess', () => exist(signInSuccess))
  it('checkIsLoggedInReceived', () => exist(checkIsLoggedInReceived))
  it('signIn', () => exist(signIn))
  it('signInFailure', () => exist(signInFailure))
  it('logOut', () => exist(logOut))
  it('logOutSuccess', () => exist(logOutSuccess))
  it('checkIsLoggedInStarted', () => exist(checkIsLoggedInStarted))
  it('preloadMagicLinkIFrame', () => exist(preloadMagicLinkIFrame))
  it('preloadMagicLinkIFrameStarted', () => exist(preloadMagicLinkIFrameStarted))
})

describe('signIn', () => {
  it('sets rememberMe', () => {
    let state = reducer(undefined, signIn({}))
    state = reducer(undefined, signIn({ rememberMe: true }))
    expect(getRememberMe(state)).toBe(true)
  })
  it('sets loading to true', () => {
    let state = reducer(undefined, signIn({}))
    expect(getSignInLoading(state)).toBe(true)
  })
})

describe('signInSuccess', () => {
  it('sets the issuer', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInSuccess({ issuer }))
    expect(getIssuer(state)).toBe(issuer)
  })
  it('Given there is an issuer, sets loggedIn to true', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInSuccess({ issuer }))
    expect(getIsLoggedIn(state)).toBe(true)
  })
  it('sets isLoading to false', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInSuccess({ issuer }))
    expect(getSignInLoading(state)).toBe(false)
  })
})

describe('signInFailure', () => {
  it('sets isLoading to false', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInFailure({ issuer }))
    expect(getSignInLoading(state)).toBe(false)
  })
})

describe('checkIsLoggedInReceived', () => {
  it('set issuer and isLoggedIn', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const payload = { issuer }
    const state = reducer(undefined, checkIsLoggedInReceived(payload))
    expect(getIsLoggedIn(state)).toBe(true)
    expect(getIssuer(state)).toBe(issuer)
  })
  it('set issuer and isLoggedIn to null if not logged in', () => {
    const payload = { issuer: null }
    const state = reducer({ isLoggedIn: true, issuer: "xpto"}, checkIsLoggedInReceived(payload))
    expect(getIsLoggedIn(state)).toBe(false)
    expect(getIssuer(state)).toBe(null)
  })
})

describe('logOutSuccess', () => {
  it('sets rememberMe and issuer to false', () => {
    let state = reducer({ rememberMe: true, issuer: 'xpto'}, logOutSuccess())
    expect(getRememberMe(state)).toBe(false)
    expect(getIssuer(state)).toBe(null)
  })
  
})

describe('hideLoader', () => {
  it('sets showLoader false', () => {
    let state = reducer({ showLoader: true }, hideLoader())
    expect(getShowLoader(state)).toBe(false)
  })
})

