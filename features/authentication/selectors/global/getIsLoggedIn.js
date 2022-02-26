import local from '../local/getIsLoggedIn';
import { mainStoreKey } from '../../authenticationSlice';

export default (state) => local(state[mainStoreKey])
