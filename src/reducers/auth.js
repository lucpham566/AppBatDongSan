import * as types from '../constants/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchToken} from '../helpers/auth';
import axiosService from '../commons/axiosService';

var initialState = {
  access_token: '',
  token_type: '',
  user: null,
};

// if (localStorage.getItem("access_token")) {
//   initialState.access_token = localStorage.getItem("access_token");
// }

// if (localStorage.getItem("token_type")) {
//   initialState.token_type = localStorage.getItem("token_type");
// }

// if (localStorage.getItem("user")) {
//   initialState.user = JSON.parse(localStorage.getItem("user"));
// }

const storeData = async value => {
  try {
    await AsyncStorage.setItem('access_token', value);
  } catch (e) {
    console.log(e);
  }
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {...state};
    case types.LOGIN_SUCCESS:
      let {data} = action.payload;
      storeData(data.access_token).then(() => fetchToken());
      axiosService.setToken(data.access_token);
      return {
        ...state,
        access_token: data.access_token,
        token_type: data.token_type,
        user: data.user,
      };
    case types.LOGIN_FALSE:
      console.log(action.payload.error);
      return {...state};

    case types.LOGOUT:
      return {...state};
    case types.LOGOUT_SUCCESS:
      AsyncStorage.removeItem('access_token');
      // localStorage.setItem("access_token", null);
      // localStorage.setItem("token_type", null);
      // localStorage.setItem("user", null);
      return {
        ...state,
        access_token: null,
        token_type: null,
        user: null,
      };
    case types.LOGOUT_FALSE:
      console.log(action.payload.error);
      return {...state};
    case types.REGISTER:
      return {...state};
    case types.REGISTER_SUCCESS:
      return {...state};
    case types.REGISTER_FALSE:
      return {...state};
    case types.GET_USER_LOGIN:
      return {...state};
    case types.GET_USER_LOGIN_SUCCESS:
      return {...state};
    case types.GET_USER_LOGIN_FALSE:
      return {...state};
    default:
      return {...state};
  }
};

export default reducer;
