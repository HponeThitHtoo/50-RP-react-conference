/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { clearValues, getSpeakers } from './speakersSlice';

export const addSpeakerThunk = async (url, speaker, thunkAPI) => {
  try {
    const id = uuidv4();
    const resp = await axios.post(url, {
      id,
      name: speaker.name,
      occupation: speaker.occupation,
      company: speaker.company,
      image: speaker.image,
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
};

export const updateSpeakerThunk = async (url, speaker, thunkAPI) => {
  try {
    const resp = await axios.patch(`${url}/${speaker.id}`, {
      name: speaker.name,
      occupation: speaker.occupation,
      company: speaker.company,
      image: speaker.image,
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
};

export const deleteSpeakerThunk = async (url, id, thunkAPI) => {
  try {
    const resp = await axios.delete(`${url}/${id}`);
    thunkAPI.dispatch(getSpeakers());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
};
