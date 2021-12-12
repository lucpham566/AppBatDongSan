import * as types from "../constants/auth";

export const getUserLogin = (id) =>{
    return {
        type : types.GET_USER_LOGIN,
        payload:{
            id
        }
    }
}

export const getUserLoginSuccess = (data) =>{
    return {
        type : types.GET_USER_LOGIN_SUCCESS,
        payload:{
            data
        }
    }
}

export const getUserLoginFalse = (error) =>{
    return {
        type : types.GET_USER_LOGIN_FALSE,
        payload:{
            error
        }
    }
}


export const login = (data) =>{
    return {
        type : types.LOGIN,
        payload:{
            data
        }
    }
}

export const loginSuccess = (data) =>{
    return {
        type : types.LOGIN_SUCCESS,
        payload:{
            data
        }
    }
}

export const loginFalse = (error) =>{
    return {
        type : types.LOGIN_FALSE,
        payload:{
            error
        }
    }
}


export const logout = (data) =>{
    return {
        type : types.LOGOUT,
        payload:{
            data
        }
    }
}

export const logoutSuccess = (data) =>{
    return {
        type : types.LOGOUT_SUCCESS,
        payload:{
            data
        }
    }
}

export const logoutFalse = (error) =>{
    return {
        type : types.LOGOUT_FALSE,
        payload:{
            error
        }
    }
}


export const register = (data) =>{
    return {
        type : types.REGISTER,
        payload:{
            data
        }
    }
}

export const registerSuccess = (data) =>{
    return {
        type : types.REGISTER_SUCCESS,
        payload:{
            data
        }
    }
}

export const registerFalse = (error) =>{
    return {
        type : types.REGISTER_FALSE,
        payload:{
            error
        }
    }
}
