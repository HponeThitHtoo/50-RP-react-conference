import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

const url = `http://localhost:5000/users`;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await axios.get(url, {
        params: { email: user.email, password: user.password },
      });
      const [loggedInUser] = resp.data;
      return { ...loggedInUser, rememberedMe: user.rememberedMe };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const existedUserResp = await axios.get(url, {
        params: { email: user.email, password: user.password },
      });
      const existedUser = existedUserResp.data;

      if (existedUser.length === 0) {
        const id = uuidv4();
        const resp = await axios.post(url, {
          id,
          name: user.name,
          email: user.email,
          password: user.password,
        });

        return resp.data;
      }

      return `${user.email} already existed`;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      toast.success('You are successfully logged out.');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.user = user;
        state.isLoading = false;
        if (user.rememberedMe) {
          addUserToLocalStorage({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        if (
          typeof payload === 'object' &&
          !Array.isArray(payload) &&
          payload !== null
        ) {
          state.user = payload;
          state.isLoading = false;
          toast.success(`Hello There ${state.user.name}`);
        } else if (typeof payload === 'string' || payload instanceof String) {
          state.isLoading = false;
          toast.warn(payload);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
