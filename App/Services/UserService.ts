import { ApiConfig } from '../ApiConfig';
import { getItemFromStorage } from '../Utils/Storage';
// import axios from 'axios';
import { axiosInstance } from '.';
import { POST } from '../Utils/Constant';

export const isLoggedIn = async () => {
  const token = await getItemFromStorage('token');
  if (!token) {
    return false;
  }
  ApiConfig.token = token;
  return true;
};

export const userLogin = async (params: any) => {
  try {
    const response = await axiosInstance(POST, ApiConfig.login, params);
    return response.data;
  } catch (error: any) {
    console.log('ERR', error);
    // throw error;
  }
};
