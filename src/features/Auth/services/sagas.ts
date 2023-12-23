import { call, put, takeLatest } from 'redux-saga/effects';
import { ISagaFunc } from '../../../services/actionConfigs';
import storage from '../../../utils/sessionStorage';
import actions from './actions';
import apis from './api';

const login: ISagaFunc<any> = function* ({ payload }) {
  const body = payload;
  try {
    const res = yield call(apis.login, body);
    const resData = res?.data?.data as (any | null);
    if (!resData) throw 'fail';

    yield storage.token.set(resData.access_token);
    const merchant_code = resData.user?.merchant?.merchant_code ?? '';
    yield storage.merchantCode.set(merchant_code);
    const merchant_id = resData.user?.merchant?.merchant_id ?? '';
    yield storage.merchantId.set(merchant_id);

    yield put(actions.login.success(resData));


  } catch (error) {
    yield put(actions.login.fail({}));
  }
};

export default function* authServiceSaga() {
  yield takeLatest(actions.login.fetch, login);
}
