import * as types from "../constants/post";

var initialState = [];

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllPost:
      return { ...state };
    case types.getAllPostSuccess:
      let { data } = action.payload;
      state = data;
      return { ...state };
    case types.getAllPostFalse:
      const { error } = action.payload;
      console.log(error);

      return { ...state };

    case types.addPost:
      return { ...state };
    case types.addPostSuccess:
      return { ...state };
    case types.addPostFalse:
      return { ...state };

    default:
      return { ...state };
  }
};

export default reducer;
