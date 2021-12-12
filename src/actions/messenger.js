import * as types from "../constants/messenger";

export const getListMessenger = () =>{
    return {
        type : types.getListMessenger
    }
}

export const addBoxMessenger = (user_id) =>{
    return {
        type : types.addBoxMessenger,
        payload:{
            user_id
        }
    }
}

export const removeBoxMessenger = (user_id) =>{
    return {
        type : types.removeBoxMessenger,
        payload:{
            user_id
        }
    }
}
