import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: true,
  topicsWithSpeaker: [],
};

const topicsWithSpeakerUrl = `http://localhost:5000/topics?_expand=speaker`;

export const getTopicsWithSpeaker = createAsyncThunk(
  'topics/getTopicsWithSepaker',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(topicsWithSpeakerUrl);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopicsWithSpeaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopicsWithSpeaker.fulfilled, (state, { payload }) => {
        state.topicsWithSpeaker = payload;
        state.isLoading = false;
      })
      .addCase(getTopicsWithSpeaker.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export default scheduleSlice.reducer;
