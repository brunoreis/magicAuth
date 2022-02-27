import { mainStoreKey } from '../../usersSlice';

export default (username) => (state) => {
    const found = !!state[mainStoreKey].users.find( (user)=> user.username === username )
    return !found
}