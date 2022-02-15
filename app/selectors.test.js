import { getUsernameIsAvailable, getLoading } from './selectors'


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
            authentication: false
        }
    }
    expect(getLoading('authentication')(state)).toBe(false)
    state.loading.authentication = true
    expect(getLoading('authentication')(state)).toBe(true)
  })
