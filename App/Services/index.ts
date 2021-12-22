import { Method } from 'axios';
import instance, { ApiConfig } from '../ApiConfig';
import { CommonActions } from '@react-navigation/native';
import { removeStoreItem } from '../Utils/Storage';
import NavigationService from '../Utils/NavigationService';

export const axiosInstance = async (
  method: Method,
  url: string,
  params?: any,
) => {
  try {
    const response = await instance({ method, url, params });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const handleInvalidToken = async () => {
  await removeStoreItem('token');
  ApiConfig.token = null;
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: 'Login' }],
    key: null,
  });
  // eslint-disable-next-line no-alert
  alert('invalid - 401');
  NavigationService.dispatch(resetAction);
};
