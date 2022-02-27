import authenticationReducer, {
  signInSuccess,
  checkIsLoggedInReceived,
  signIn,
  signInFailure,
  logOut,
  logOutSuccess,
  checkIsLoggedInStarted,
  preloadMagicLinkIFrame,
  preloadMagicLinkIFrameStarted
} from './authenticationSlice';


const exist = (actionCreator) => {
  actionCreator()
}

const reducer = authenticationReducer

it('should handle initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    checkIsLoggedInLoading: false,
    email: null,
    issuer: null,
    rememberMe: false,
    signInLoading: false,
  });
});

describe('existent actionCreators', () => {
  it('signInSuccess', () => exist(signInSuccess))
  it('checkIsLoggedInStarted', () => exist(checkIsLoggedInStarted))
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
    let state = reducer(undefined, signIn({ rememberMe: true }))
    expect(state.rememberMe).toBe(true)
  })
  it('sets loading to true', () => {
    let state = reducer(undefined, signIn({}))
    expect(state.signInLoading).toBe(true)
  })
})

describe('signInSuccess', () => {
  it('sets the issuer', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInSuccess({ issuer }))
    expect(state.issuer).toBe(issuer)
  })
  
  it('sets isLoading to false', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInSuccess({ issuer }))
    expect(state.signInLoading).toBe(false)
  })
})

describe('signInFailure', () => {
  it('sets isLoading to false', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const state = reducer(undefined, signInFailure({ issuer }))
    expect(state.signInLoading).toBe(false)
  })
})

describe('checkIsLoggedInReceived', () => {
  it('set checkIsLoggedInLoading to false', () => {
    const state = reducer(undefined, checkIsLoggedInReceived({}))
    expect(state.checkIsLoggedInLoading).toBe(false)
  })
  it('set issuer', () => {
    const issuer = 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'
    const payload = { issuer }
    const state = reducer(undefined, checkIsLoggedInReceived(payload))
    expect(state.issuer).toBe(issuer)
  })
  it('set email', () => {
    const email = 'e@mail.com'
    const issuer = 'xpto'
    const payload = { issuer, email }
    const state = reducer(undefined, checkIsLoggedInReceived(payload))
    expect(state.email).toBe(email)
  })
  it('set issuer to null if not logged in', () => {
    const payload = { issuer: null }
    const state = reducer({ isLoggedIn: true, issuer: "xpto"}, checkIsLoggedInReceived(payload))
    expect(state.issuer).toBe(null)
  })

  it('set checkIsLoggedInLoading to false', () => {
    const state = reducer({ checkIsLoggedInLoading: true}, checkIsLoggedInReceived({}))
    expect(state.checkIsLoggedInLoading).toBe(false)
  })
})

describe('logOutSuccess', () => {
  it('sets rememberMe to false', () => {
    let state = reducer({ rememberMe: true, issuer: 'xpto'}, logOutSuccess())
    expect(state.rememberMe).toBe(false)
  })
  it('sets  issuer to null', () => {
    let state = reducer({ rememberMe: true, issuer: 'xpto'}, logOutSuccess())
    expect(state.issuer).toBe(null)
  })
  it('sets  email to null', () => {
    let state = reducer({ rememberMe: true, issuer: 'xpto', email: 'x@pto.com'}, logOutSuccess())
    expect(state.email).toBe(null)
  })
})


