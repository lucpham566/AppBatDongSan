import * as types from "../constants/post";

export const getAllPost = () =>{
    return {
        type : types.getAllPost
    }
}

export const getAllPostSuccess = (data) =>{
    return {
        type : types.getAllPostSuccess,
        payload: {
            data
        }
    }
}

export const getAllPostFalse = (error) =>{
    return {
        type : types.getAllPostFalse,
        payload:{
            error
        }
    }
}

export const addPost = (data) =>{
    return {
        type : types.addPost,
        payload:{
            data
        }
    }
}

export const addPostSuccess = () =>{
    return {
        type : types.addPostSuccess,
        payload:{
            
        }
    }
}

export const addPostFalse = () =>{
    return {
        type : types.addPostFalse,
        payload:{
            
        }
    }
}
