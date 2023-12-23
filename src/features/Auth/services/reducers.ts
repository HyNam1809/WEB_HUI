import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import actions from './actions';
import storage from '../../../utils/sessionStorage';

const initialState: any = {
  access_token: storage.token.get(),
  token_type: null,
  user: null,
  merchant: null,
};

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.login.success, (state, { payload }) => {
      const data: any = payload;
      state.access_token = data?.access_token ?? null;
      state.token_type = data?.token_type ?? null;
      state.user = data?.user ?? null;
      state.merchant = data?.user?.merchant ?? null;
    })
      // .addCase(actions.setToken, (state, { payload }) => {
      //   state.access_token = payload;
      //   storage.token.set(payload);
      // })
      // .addCase(actions.logout.success, (state) => {
      //   state.access_token = null;
      //   state.token_type = null;
      //   state.user = null;
      //   state.merchant = null;
      // })
      ;
  },
});
const authServiceReducer = Slice.reducer;
export default authServiceReducer;
