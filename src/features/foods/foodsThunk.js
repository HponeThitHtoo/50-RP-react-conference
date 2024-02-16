/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
import axios from 'axios';

import { clearValues, getFoods } from './foodsSlice';

export const updateFoodThunk = async (url, food, thunkAPI) => {
  try {
    const resp = await axios.patch(`${url}/${food.id}`, {
      title: food.title,
      time: food.time,
      food: food.food,
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
};

export const deleteFoodThunk = async (url, id, thunkAPI) => {
  try {
    const resp = await axios.delete(`${url}/${id}`);
    thunkAPI.dispatch(getFoods());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
};
