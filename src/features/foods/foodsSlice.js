/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { updateFoodThunk, deleteFoodThunk } from './foodsThunk';

const initialState = {
  isLoading: true,
  isEditLoading: false,
  foods: null,
  editFood: null,
};

const url = `http://localhost:5000/foods`;

export const getFoods = createAsyncThunk(
  'foods/getFoods',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

export const getFood = createAsyncThunk(
  'foods/getFood',
  async ({ id }, thunkAPI) => {
    try {
      const resp = await axios.get(url, {
        params: { id },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const updateFood = createAsyncThunk(
  'foods/updateFood',
  async (food, thunkAPI) => {
    return updateFoodThunk(url, food, thunkAPI);
  }
);

export const deleteFood = createAsyncThunk(
  'foods/deleteFood',
  async (id, thunkAPI) => {
    return deleteFoodThunk(url, id, thunkAPI);
  }
);

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFoods.fulfilled, (state, { payload }) => {
        state.foods = payload;
        state.isLoading = false;
      })
      .addCase(getFoods.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      .addCase(getFood.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(getFood.fulfilled, (state, { payload }) => {
        [state.editFood] = payload;
        state.isEditLoading = false;
      })
      .addCase(getFood.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(updateFood.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(updateFood.fulfilled, (state) => {
        state.isEditLoading = false;
        toast.success('Food Updated Successfully');
      })
      .addCase(updateFood.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(deleteFood.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(deleteFood.fulfilled, (state) => {
        state.isEditLoading = false;
        toast.success('Food Deleted Successfully');
      })
      .addCase(deleteFood.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      });
  },
});

export const { clearValues } = foodsSlice.actions;

export default foodsSlice.reducer;
