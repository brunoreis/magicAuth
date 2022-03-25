import { mainStoreKey } from '../../slice/usersSlice';

export default (username) => (state) => {
    const found = !!state[mainStoreKey].users.find( (user)=> user.username === username )
    return !found
}