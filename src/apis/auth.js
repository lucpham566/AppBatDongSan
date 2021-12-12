import axiosService from '../commons/axiosService';
import {urlServer} from '../commons/server';

const url = urlServer + 'api/';

export const login = data => {
  return axiosService.post(url + 'login', data);
};

export const logout = () => {
  return axiosService.post(url + 'logout');
};

export const register = data => {
  return axiosService.post(url + 'register', data);
};

export const getUserProfile = id => {
  return axiosService.get(url + 'user-profile', id);
};
