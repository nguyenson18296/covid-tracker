import { RouterState } from "connected-react-router";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { fetchAPI } from "../config";
import {
  FETCH_SUMMARY,
  FETCH_SUMMARY_FAILED,
  FETCH_SUMMARY_SUCCESS,
  FETCH_COUNTRY,
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAILED,
} from "./actionTypes";

// The top-level state object
export interface ApplicationState {
  covid: any;
  router: RouterState;
  country: any;
}

function* fetchSummary() {
  try {
    const response: Promise<any> = yield call(fetchAPI, "summary", "GET");
    yield put({ type: FETCH_SUMMARY_SUCCESS, data: response });
  } catch (e) {
    yield put({ type: FETCH_SUMMARY_FAILED, message: e.message });
  }
}

function* fetchCountry() {
  try {
    const response: Promise<any> = yield call(fetchAPI, "countries", "GET");
    yield put({ type: FETCH_COUNTRY_SUCCESS, data: response });
  } catch (e) {
    yield put({ type: FETCH_COUNTRY_FAILED, message: e.message });
  }
}

function* summaryWatcher() {
  yield takeEvery(FETCH_SUMMARY, fetchSummary);
}

function* countryWatcher() {
  yield takeEvery(FETCH_COUNTRY, fetchCountry);
}

export function* rootSaga() {
  yield all([fork(summaryWatcher), fork(countryWatcher)]);
}
