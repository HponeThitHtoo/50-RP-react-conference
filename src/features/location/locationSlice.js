import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: true,
  isEditLoading: false,
  location: null,
  editLocation: null,
};

const url = `http://localhost:5000/location`;

export const getLocation = createAsyncThunk(
  'location/getLocation',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async (location, thunkAPI) => {
    console.log(location);
    try {
      const resp = await axios.patch(`${url}/${location.id}`, {
        address: location.address,
        room: location.room,
        time: location.time,
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.isLoading = true;
        state.editLocation = null;
      })
      .addCase(getLocation.fulfilled, (state, { payload }) => {
        [state.location] = payload;
        state.editLocation = null;
        state.isLoading = false;
      })
      .addCase(getLocation.rejected, (state, action) => {
        console.log(action);
        state.editLocation = null;
        state.isLoading = false;
      })
      .addCase(updateLocation.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, { payload }) => {
        state.editLocation = payload;
        state.isEditLoading = false;
        toast.success('Location Updated Successfully');
      })
      .addCase(updateLocation.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      });
  },
});

export default locationSlice.reducer;
