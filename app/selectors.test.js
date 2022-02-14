import { getUsernameIsAvailable} from './selectors'


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


