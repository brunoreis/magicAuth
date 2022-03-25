import getUsernameIsAvailable from './getUsernameIsAvailable';
import { mainStoreKey } from '../../slice/usersSlice';

it('get user by issuer', () => {
    const issuer = "xpto"
    const username = "dude"
    const queryUsername2 = "dude2"
    const state = {
        [mainStoreKey]:{
            users:[
                {
                    issuer,
                    username
                }
            ]
        }
    }
    expect(getUsernameIsAvailable(username)(state)).toBe(false)
    expect(getUsernameIsAvailable(queryUsername2)(state)).toBe(true)
})