/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  addSpeakerThunk,
  updateSpeakerThunk,
  deleteSpeakerThunk,
} from './speakersThunk';

const url = `http://localhost:5000/speakers`;

const initialState = {
  isLoading: true,
  isEditLoading: false,
  speakers: null,
  speaker: null,
};

export const getSpeakers = createAsyncThunk(
  'speakers/getSpeakers',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

export const getSpeaker = createAsyncThunk(
  'speakers/getSpeaker',
  async ({ id }, thunkAPI) => {
    try {
      const resp = await axios.get(url, {
        params: { id },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

export const addSpeaker = createAsyncThunk(
  'speakers/addSpeaker',
  async (speaker, thunkAPI) => {
    return addSpeakerThunk(url, speaker, thunkAPI);
  }
);

export const updateSpeaker = createAsyncThunk(
  'speakers/updateSpeaker',
  async (speaker, thunkAPI) => {
    return updateSpeakerThunk(url, speaker, thunkAPI);
  }
);

export const deleteSpeaker = createAsyncThunk(
  'speakers/deleteSpeaker',
  async (id, thunkAPI) => {
    return deleteSpeakerThunk(url, id, thunkAPI);
  }
);

const speakersSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpeakers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpeakers.fulfilled, (state, { payload }) => {
        state.speakers = payload;
        state.speaker = null;
        state.isLoading = false;
      })
      .addCase(getSpeakers.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      .addCase(addSpeaker.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(addSpeaker.fulfilled, (state) => {
        // state.speaker = payload;
        state.isEditLoading = false;
        toast.success('Speaker Added Successfully');
      })
      .addCase(addSpeaker.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(getSpeaker.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(getSpeaker.fulfilled, (state, { payload }) => {
        [state.speaker] = payload;
        state.isEditLoading = false;
      })
      .addCase(getSpeaker.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(updateSpeaker.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(updateSpeaker.fulfilled, (state) => {
        // state.speaker = payload;
        state.isEditLoading = false;
        toast.success('Speaker Updated Successfully');
      })
      .addCase(updateSpeaker.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(deleteSpeaker.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(deleteSpeaker.fulfilled, (state) => {
        state.isEditLoading = false;
        toast.success('Speaker Deleted Successfully');
      })
      .addCase(deleteSpeaker.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      });
  },
});

export const { clearValues } = speakersSlice.actions;

export default speakersSlice.reducer;
