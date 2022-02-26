import local from '../local/getRememberMe';
import { mainStoreKey } from '../../authenticationSlice';

export default (state) => local(state[mainStoreKey])
