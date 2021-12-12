import * as types from '../constants/account';
import {getAvatar, setAvatar} from '../helpers/helper';

var initialState = {
};

// if (localStorage.getItem('account')) {
//   initialState.account = JSON.parse(localStorage.getItem('account'));
// }

var reducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch account login
    case types.FETCH_ACCOUNT:
      return {...state};
    case types.FETCH_ACCOUNT_SUCCESS:
      const {data} = action.payload;
      if (data.avatar && data.avatar.image) {
        setAvatar(data.avatar.image);
      }

      return {...data};
    case types.FETCH_ACCOUNT_FALSE:
      console.log(action.error);
      return {...state};

    // upload avatar
    case types.POST_AVATAR:
      return {...state};
    case types.POST_AVATAR_SUCCESS:
      return {...state};
    case types.POST_AVATAR_FALSE:
      console.log(action.error);
      return {...state};

    default:
      return {...state};
  }
};

export default reducer;
