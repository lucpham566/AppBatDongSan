import * as types from '../constants/screen';

export const goToProductDetail = data => {
  return {
    type: types.GO_TO_PRODUCT_DETAIL,
    data,
  };
};

export const addNavigation = data => {
  return {
    type: types.ADD_NAVIGATION,
    data,
  };
};

export const showLoading = data => {
  return {
    type: types.SHOW_LOADING,
    data,
  };
};
export const hideLoading = data => {
  return {
    type: types.HIDE_LOADING,
    data,
  };
};
