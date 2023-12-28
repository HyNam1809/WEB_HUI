import { createAction } from '@reduxjs/toolkit';
import { createAsyncAction } from '../../../services/actionConfigs';
import { PREFIX_ACTIONS } from './constants';

const login = createAsyncAction<any>(PREFIX_ACTIONS + 'LOGIN');
const setToken = createAction<string>(PREFIX_ACTIONS + 'SET_TOKEN');

const authActions = {
    login,
    setToken
};

export default authActions;