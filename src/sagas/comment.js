import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/comment";
import * as action from "../actions/comment";
import * as api from "../apis/comment";
import { Toast } from "../commons/notification";

function* watchAddCommentAction({ payload }) {
  const res = yield call(api.addComment, payload.data);
  if (res.status === 201) {

    yield put(action.fetchListComment(payload.data.post_id));
  } else {
  }
}

function* watchFetchListCommentAction({payload}) {

  const res = yield call(api.getListCommentPost,payload.post_id);

  if (res.status === 200) {
    console.log(res);

    yield put(action.fetchListCommentSuccess(res.data));
  } else {
  }
}

export function* rootSaga() {
  yield takeEvery(types.ADD_COMMENT, watchAddCommentAction);
  yield takeEvery(types.GET_LIST_COMMENT_POST, watchFetchListCommentAction);
}

export default rootSaga;
