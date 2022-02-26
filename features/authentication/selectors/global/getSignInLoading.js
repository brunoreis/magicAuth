import local from '../local/getSignInLoading';
import { mainStoreKey } from '../../authenticationSlice';

export default (state) => local(state[mainStoreKey])
