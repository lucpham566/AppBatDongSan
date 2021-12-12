import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/user";
import * as action from "../actions/user";
import * as api from "../apis/user";

function* watchGetPostUserAction({ payload }) {
  let { id } = payload;
  const res = yield call(api.getPostUser, id);
  if (res.status === 200) {
    yield put(action.getPostUserSuccess(res.data));
  } else {
    yield put(action.getPostUserFalse(res.error));
  }
}

function* watchGetUserAction({payload}) {
  let { id } = payload;
  const res = yield call(api.getUser,id);
  if (res.status === 200) {
    yield put(action.getUserSuccess(res.data));
  } else {
    yield put(action.getUserFalse(res.data));
  }
}

export function* rootSaga() {
  yield takeEvery(types.GET_POST_USER, watchGetPostUserAction);
  yield takeEvery(types.GET_USER, watchGetUserAction);

}

export default rootSaga;
