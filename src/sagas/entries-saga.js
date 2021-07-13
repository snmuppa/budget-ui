import { call, put, take } from 'redux-saga/effects';
import entriesTypes from '../actions/entries-actions';
import axios from 'axios';

export function* getAllEntries() {
  yield take(entriesTypes.GET_ENTRIES);
  // Gets the entries using 'call' redux effect
  const result = yield call(axios, 'http://localhost:3002/entries');
  //
  yield put({ type: entriesTypes.POPULATE_ENTRIES, payload: result.data });
}
