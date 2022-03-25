import getUser from './getUser';
import { mainStoreKey } from '../../slice/usersSlice';

it('get user by issuer', () => {
    const issuer = "xpto"
    const email = "xpto@gmail.com"
    const state = {
        [mainStoreKey]:{
            users:[
                {
                    issuer,
                    email
                }
            ]
        }
    }
    expect(getUser(issuer)(state).email).toBe(email)
})