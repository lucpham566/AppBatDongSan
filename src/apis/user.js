import axiosService from '../commons/axiosService';
import {urlServer} from '../commons/server';

const url = urlServer + 'api/';

export const getUser = data => {
  return axiosService.get(url + 'user/' + data);
};

export const getPostUser = data => {
  return axiosService.get(url + 'user/' + data + '/post');
};
