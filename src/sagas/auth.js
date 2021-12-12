import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../constants/auth';
import * as action from '../actions/auth';
import * as actionScreen from '../actions/screen';
import * as actionAccount from '../actions/account';
import * as api from '../apis/auth';
import axios from 'axios';
import Toast from 'react-native-toast-message';

function* watchLoginAction({payload}) {
  let data = {
    email: payload.data.email,
    password: payload.data.password,
  };
  yield put(actionScreen.showLoading());

  try {
    const res = yield call(api.login, data);
    if (res.status === 200) {
      Toast.show({
        text1: 'Đăng nhập thành công',
      });
      yield put(action.loginSuccess(res.data));
      yield put(actionAccount.fetchAccount());
    } else {
      // yield put(action.loginFalse(res.data));
      Toast.show({
        type: 'error',
        text1: 'Tài khoản hoặc mật khẩu không đúng',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Lỗi đăng nhập',
    });
  }
  yield put(actionScreen.hideLoading());

}

function* watchLogoutAction() {
  const res = yield call(api.logout);

  if (res.status === 200) {
    yield put(action.logoutSuccess(res.data));
    Toast.show({
      type: 'success',
      text1: 'Đăng xuất thành công',
    });
  } else {
    yield put(action.loginFalse(res.data));
    Toast.show({
      type: 'error',
      text1: 'Đăng xuất thất bại',
    });
  }
}

function* watchRegisterAction({payload}) {
  let data = {
    name: payload.data.name,
    email: payload.data.email,
    phone: payload.data.phone,
    password: payload.data.password,
  };
  console.log(data);
  try {
    const res = yield call(api.register, data);
    console.log(res);
    if (res.status === 201) {
      Toast.show({
        text1: 'Đăng ký thành công',
      });
      yield put(action.registerSuccess(res.data));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Đăng ký thất bại',
      });
      yield put(action.registerFalse(res.data));
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Lỗi đăng ký',
    });
  }
}

// function* watchGetUserLoginAction() {
//   const res = yield call(api.getUserProfile);

//   if (res.status === 200) {
//     yield put(action.getUserLoginSuccess(res.data));
//   } else {
//     yield put(action.getUserLoginFalse(res.data));
//   }
// }

export function* rootSaga() {
  yield takeEvery(types.LOGIN, watchLoginAction);
  yield takeEvery(types.LOGOUT, watchLogoutAction);
  yield takeEvery(types.REGISTER, watchRegisterAction);
  // yield takeEvery(types.GET_USER_LOGIN, watchGetUserLoginAction);
}

export default rootSaga;
