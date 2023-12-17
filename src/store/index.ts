import { configureStore, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootReducer, rootSaga } from './root';

const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware: (SagaMiddleware<{}> | Middleware<{}, any, any>)[] = [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
    ];

    return customizedMiddleware as any;
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;