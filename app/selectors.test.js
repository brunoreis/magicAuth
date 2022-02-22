import { getUsernameIsAvailable, getLoading, getSignInLoading } from './selectors'


describe('getUsernameIsAvaliable', ()=> {
    it('getUsernameIsAvailable', () => {
        const state = { 
            users: {
                users: [{ username: 'dude'}]
            }
        }
        expect(getUsernameIsAvailable('dude')(state)).toBe(false)
        expect(getUsernameIsAvailable('person')(state)).toBe(true)
    })
})

it('getLoading', () => {
    const state = { 
        loading: { 
            authentication: false,
            app: true
        }
    }
    expect(getLoading('authentication')(state)).toBe(false)
    state.loading.authentication = true
    expect(getLoading('authentication')(state)).toBe(true)
    expect(getLoading('app')(state)).toBe(true)
  })

  it('getSignInLoading', () => {
    const state = { 
        authentication: {
            loading: true
        }
    }
    expect(getSignInLoading(state)).toBe(true)
  })
