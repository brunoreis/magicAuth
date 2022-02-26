import local from '../local/getIssuer';
import { mainStoreKey } from '../../authenticationSlice';

export default (state) => local(state[mainStoreKey])
