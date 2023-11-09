import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getResponse } from '../lib/getResponse';
import { editService } from './serviceList';

const initialState = {
  service: {
    id: '',
    name: '',
    price: '',
    content: '',
  },
  loading: false,
  error: null,
};

export const editServiceAsync = createAsyncThunk(
  'editService/fetchEditService',
  async ({ service, history }, { dispatch, rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: `${process.env.REACT_APP_API_SERVICES}/${service.id}?fortune`,
        method: 'PUT',
        data: service,
      });
      dispatch(editService(data));
      dispatch(resetEditForm());
      history.push(process.env.REACT_APP_HOMEPAGE);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const editServiceSlice = createSlice({
  name: 'editService',
  initialState,
  reducers: {
    getServiceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getServiceSuccess: (state, { payload }) => {
      state.service = payload;
      state.loading = false;
      state.error = null;
    },
    getServiceFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    changeEditServiceField: (state, { payload }) => {
      const { name, value } = payload;
      state.service[name] = value;
    },
    resetEditForm: (state) => {
      state.service = initialState.service;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getServiceRequest,
  getServiceSuccess,
  getServiceFailure,
  changeEditServiceField,
  resetEditForm,
} = editServiceSlice.actions;

export const editServiceReducer = editServiceSlice.reducer;
