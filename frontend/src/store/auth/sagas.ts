import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from "@/lib/api/auth";
import { clearSession, logoutRequested } from "./reducer";

function* logoutWorker() {
  try { yield call(authApi.logout); } finally { yield put(clearSession()); }
}

export function* authSaga() {
  yield takeLatest(logoutRequested.type, logoutWorker);
}
