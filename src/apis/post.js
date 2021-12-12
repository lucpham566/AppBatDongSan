import axiosService from '../commons/axiosService';
import {urlServer} from '../commons/server';

const url = urlServer + 'api/post';

export const getAllPost = () => {
  return axiosService.get(url);
};

export const createPost = data => {
  return axiosService.post(url, data);
};
