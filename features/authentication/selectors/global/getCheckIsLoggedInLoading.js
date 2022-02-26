import local from '../local/getCheckIsLoggedInLoading';
import { mainStoreKey } from '../../authenticationSlice';

export default (state) => local(state[mainStoreKey])
