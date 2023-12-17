import { all } from 'redux-saga/effects';
// import authServiceSaga from 'features/auth/services/sagas';
export default function* rootSaga() {
  yield all([
    // define module saga here
    // authServiceSaga(),
  ]);
}
