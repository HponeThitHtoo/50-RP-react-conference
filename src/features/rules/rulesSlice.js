/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { addRuleThunk, updateRuleThunk, deleteRuleThunk } from './rulesThunk';

const initialState = {
  isLoading: true,
  isEditLoading: false,
  rules: null,
  editRule: null,
};

const url = `http://localhost:5000/rules`;

export const getRules = createAsyncThunk(
  'rules/getRules',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

export const getRule = createAsyncThunk(
  'rules/getRule',
  async ({ id }, thunkAPI) => {
    try {
      const resp = await axios.get(url, {
        params: { id },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong!');
    }
  }
);

export const addRule = createAsyncThunk(
  'rules/addRule',
  async (rule, thunkAPI) => {
    return addRuleThunk(url, rule, thunkAPI);
  }
);

export const updateRule = createAsyncThunk(
  'rules/updateRule',
  async (rule, thunkAPI) => {
    return updateRuleThunk(url, rule, thunkAPI);
  }
);

export const deleteRule = createAsyncThunk(
  'rules/deleteRule',
  async (id, thunkAPI) => {
    return deleteRuleThunk(url, id, thunkAPI);
  }
);

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    clearVaules: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRules.fulfilled, (state, { payload }) => {
        // console.dir(payload);
        state.rules = payload;
        state.editRule = null;
        state.isLoading = false;
      })
      .addCase(getRules.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      .addCase(addRule.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(addRule.fulfilled, (state) => {
        state.isEditLoading = false;
        toast.success('Rule Added Successfully');
      })
      .addCase(addRule.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(getRule.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(getRule.fulfilled, (state, { payload }) => {
        [state.editRule] = payload;
        state.isEditLoading = false;
      })
      .addCase(getRule.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(updateRule.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(updateRule.fulfilled, (state) => {
        state.isEditLoading = false;
        toast.success('Rule Updated Successfully');
      })
      .addCase(updateRule.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      })
      .addCase(deleteRule.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(deleteRule.fulfilled, (state) => {
        state.isEditLoading = false;
        toast.success('Rule Deleted Successfully');
      })
      .addCase(deleteRule.rejected, (state, action) => {
        console.log(action);
        state.isEditLoading = false;
      });
  },
});

export const { clearVaules } = rulesSlice.actions;

export default rulesSlice.reducer;
