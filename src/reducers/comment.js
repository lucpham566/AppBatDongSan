import * as types from "../constants/comment";

var initialState = [];

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_COMMENT_POST:
      return { ...state };

    case types.GET_LIST_COMMENT_POST_SUCCESS:
      let { data } = action.payload;
      console.log(data);
      
      return { ...data };

    case types.GET_LIST_COMMENT_POST_FALSE:
      const { error } = action.payload;
      console.log(error);

      return { ...state };

    case types.ADD_COMMENT:
      return { ...state };
    case types.ADD_COMMENT_SUCCESS:
      return { ...state };
    case types.ADD_COMMENT_FALSE:

      return { ...state };

    default:
      return { ...state };
  }
};

export default reducer;
