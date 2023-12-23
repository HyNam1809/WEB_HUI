import { createAsyncAction } from '../../../services/actionConfigs';
import { PREFIX_ACTIONS } from './constants';

const login = createAsyncAction<any>(PREFIX_ACTIONS + 'LOGIN');

const authActions = {
    login
};

export default authActions;