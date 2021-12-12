import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../constants/post';
import * as action from '../actions/post';
import * as api from '../apis/post';
import Toast from 'react-native-toast-message';

function* watchGetAllPostAction() {
  const res = yield call(api.getAllPost);
  if (res.status === 200) {
    yield put(action.getAllPostSuccess(res.data));
  } else {
    yield put(action.getAllPostFalse());
  }
}

function* watchAddPostAction({payload}) {
  let {data} = payload;

  const formData = new FormData();
  if (data.images && data.images.length > 0) {
    data.images.map((item, index) => {
      const name = item.path.substring(item.path.lastIndexOf('/') + 1);
      formData.append(`images[]`, {
        uri: item.path,
        type: item.mime,
        name: name,
      });
    });
  }
  formData.append('content', data.content);
  if (data.tags?.length > 0) {
    formData.append('tags', `${data.tags}`);
  }

  try {
    const res = yield call(api.createPost, formData);
    console.log(res);
    if (res.status === 201) {
      Toast.show({
        text1: 'Tạo bài viết thành công',
      });
      yield put(action.addPostSuccess());
      yield put(action.getAllPost());
    } else {
      yield put(action.addPostFalse());
      Toast.show({
        type: 'error',
        text1: 'Tạo bài viết thất bại',
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* rootSaga() {
  yield takeEvery(types.getAllPost, watchGetAllPostAction);
  yield takeEvery(types.addPost, watchAddPostAction);
}

export default rootSaga;
