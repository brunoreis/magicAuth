
import { mainStoreKey } from '../../slice/usersSlice';

export default issuer => state => {
    return state[mainStoreKey].users.find(user => user.issuer === issuer)
}