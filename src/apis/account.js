import axiosService from '../commons/axiosService';
import {urlServer} from '../commons/server';

const url = urlServer + 'api/';

export const fetchAccount = () => {
  return axiosService.get(url + 'user-profile');
};

export const postAvatar = data => {
  return axiosService.post(url + 'change_avatar', data);
};

export const postInfo = data => {
  return axiosService.post(url + 'change-info', data);
};
