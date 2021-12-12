import * as types from "../constants/user";

export const getPostUser = (id) =>{
    return {
        type : types.GET_POST_USER,
        payload:{
            id
        }
    }
}

export const getPostUserSuccess = (data) =>{
    return {
        type : types.GET_POST_USER_SUCCESS,
        payload:{
            data
        }
    }
}

export const getPostUserFalse = (error) =>{
    return {
        type : types.GET_POST_USER_FALSE,
        payload:{
            error
        }
    }
}


export const getUser = (id) =>{
    return {
        type : types.GET_USER,
        payload:{
            id
        }
    }
}

export const getUserSuccess = (data) =>{
    return {
        type : types.GET_USER_SUCCESS,
        payload:{
            data
        }
    }
}

export const getUserFalse = (error) =>{
    return {
        type : types.GET_USER_FALSE,
        payload:{
            error
        }
    }
}

