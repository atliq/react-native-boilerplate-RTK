/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../Services/UserService';
import { RootState } from '../Stores';
import { removeStoreItem, setItemInStorage } from '../Utils/Storage';

interface AuthState {
  isAuth: boolean;
}
const initialState: AuthState = {
  isAuth: false,
};

export const login = createAsyncThunk<any, void, { state: RootState }>(
  'auth/login',
  async thunkAPI => {
    //DIRECTLY RETURN BACKEND CALL
    return userLogin({
      email: 'jay@gmail.com',
      password: 'Admin@123',
    });
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuth = false;
      removeStoreItem('token');
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      setItemInStorage('token', 'set login token');
      // PLACE THE SETITEMINSTORAGE FUNCTION HERE WITHOUT AWAITING
      // MULTISET IN THE STORE
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
