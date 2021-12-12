import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../constants/account';
import * as action from '../actions/account';
import * as api from '../apis/account';
import Toast from 'react-native-toast-message';

function* watchFetchAccountAction({payload}) {
  try {
    const res = yield call(api.fetchAccount);
    if (res.status === 200) {
      yield put(action.fetchAccountSuccess(res.data));
    } else {
      console.log(res.error);
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchPostInfoAction({payload}) {
  let {data} = payload;
  try {
    const res = yield call(api.postInfo, data);
    if (res.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Chỉnh sửa thành công',
      });
      yield put(action.fetchAccount());
    } else {
      console.log(res.error);
      Toast.show({
        type: 'error',
        text1: 'Chỉnh sửa thất bại',
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchPostAvatarAction({payload}) {
  let {data} = payload;
  const formData = new FormData();

  if (data) {
    const name = data.path.substring(data.path.lastIndexOf('/') + 1);
    formData.append(`avatar`, {
      uri: data.path,
      type: data.mime,
      name: name,
    });
  }

  try {
    const res = yield call(api.postAvatar, formData);
    console.log(res);
    if (res.status === 201) {
      Toast.show({
        type: 'success',
        text1: 'Chỉnh sửa thành công',
      });
      yield put(action.fetchAccount());
    } else {
      Toast.show({
        type: 'error',
        text1: 'Chỉnh sửa thất bại',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Chỉnh sửa thất bại',
    });
  }
}

export function* rootSaga() {
  yield takeEvery(types.FETCH_ACCOUNT, watchFetchAccountAction);
  yield takeEvery(types.POST_AVATAR, watchPostAvatarAction);
  yield takeEvery(types.POST_INFO, watchPostInfoAction);
}

export default rootSaga;
