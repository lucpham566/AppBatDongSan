import * as types from "../constants/account";

// lấy thông tin người dùng đang đăng nhập
export const fetchAccount = () =>{
    return {
        type : types.FETCH_ACCOUNT,
    }
}

export const fetchAccountSuccess = (data) =>{
    return {
        type : types.FETCH_ACCOUNT_SUCCESS,
        payload:{
            data
        }
    }
}

export const fetchAccountFalse = (error) =>{
    return {
        type : types.FETCH_ACCOUNT_FALSE,
        payload:{
            error
        }
    }
}

// Phần upload information

export const postInfo = (data) =>{
    return {
        type : types.POST_INFO,
        payload:{
            data
        }
    }
}


// Phần upload avatar

export const postAvatar = (data) =>{
    return {
        type : types.POST_AVATAR,
        payload:{
            data
        }
    }
}

export const postAvatarSuccess = (data) =>{
    return {
        type : types.POST_AVATAR_SUCCESS,
        payload:{
            data
        }
    }
}

export const postAvatarFalse = (error) =>{
    return {
        type : types.POST_AVATAR_FALSE,
        payload:{
            error
        }
    }
}
