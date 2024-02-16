/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { clearVaules, getRules } from './rulesSlice';

export const addRuleThunk = async (url, rule, thunkAPI) => {
  try {
    const id = uuidv4();
    const resp = await axios.post(url, {
      id,
      rule: rule.rule,
    });
    thunkAPI.dispatch(clearVaules());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong!');
  }
};

export const updateRuleThunk = async (url, rule, thunkAPI) => {
  try {
    const resp = await axios.patch(`${url}/${rule.id}`, {
      rule: rule.rule,
    });
    thunkAPI.dispatch(clearVaules());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong!');
  }
};

export const deleteRuleThunk = async (url, id, thunkAPI) => {
  try {
    const resp = await axios.delete(`${url}/${id}`);
    thunkAPI.dispatch(getRules());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
};
