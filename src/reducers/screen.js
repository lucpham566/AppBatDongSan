import * as types from '../constants/screen';

const initialState = {navigation:null,globalLoading:false};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_NAVIGATION: {
            const navigation = action.data;
            return {
                ...state,
                navigation
            }
        }
        case types.GO_TO_PRODUCT_DETAIL: {
            return {
                ...state
            }
        }

        case types.SHOW_LOADING: {
            return {
                ...state,
                globalLoading:true
            }
        }

        case types.HIDE_LOADING: {
            return {
                ...state,
                globalLoading:false
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}

export default reducer;