import { createStore, combineReducers, applyMiddleware } from 'redux';
import entriesReducer from '../reducers/entries-reducers';
import modalsReducer from '../reducers/modals-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { testSaga } from '../sagas/test-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const configureStore = () => {
  const store = createStore(
    combineReducers({ entries: entriesReducer, modals: modalsReducer }),
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(testSaga);
  return store;
};

export default configureStore;
