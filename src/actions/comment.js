import * as types from "../constants/comment";

export const fetchListComment = (post_id) =>{
    return {
        type : types.GET_LIST_COMMENT_POST,
        payload:{
            post_id
        }
    }
}

export const fetchListCommentSuccess = (data) =>{
    return {
        type : types.GET_LIST_COMMENT_POST_SUCCESS,
        payload:{
            data
        }
    }
}

export const fetchListCommentFalse = (error) =>{
    return {
        type : types.GET_LIST_COMMENT_POST_FALSE,
        payload:{
            error
        }
    }
}

export const addComment = (data) =>{
    return {
        type : types.ADD_COMMENT,
        payload:{
            data
        }
    }
}

export const addCommentSuccess = (data) =>{
    return {
        type : types.ADD_COMMENT_SUCCESS,
        payload:{
            data
        }
    }
}

export const addCommentFalse = (error) =>{
    return {
        type : types.ADD_COMMENT_FALSE,
        payload:{
            error
        }
    }
}