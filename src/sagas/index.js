import * as entriesSaga from './entries-saga';

export function initSaga(sagaMiddleware) {
  // This runs all the functuions in the test-saga
  Object.values(entriesSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}
