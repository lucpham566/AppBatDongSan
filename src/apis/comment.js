import axiosService from '../commons/axiosService';
import { urlServer } from '../commons/server';

const url = urlServer+'api/comment';


export const getListCommentPost = (post_id) => {
    return axiosService.get(url+"/"+post_id)
}

export const addComment = (data) => {
    return axiosService.post(url,data)
}

