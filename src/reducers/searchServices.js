import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchField: '',
  foundServices: null,
  loading: false,
  error: null,
};

export const searchServicesSlice = createSlice({
  name: 'searchServices',
  initialState,
  reducers: {
    changeSearchField: (state, { payload }) => {
      if (!payload) {
        state.searchField = '';
        state.foundServices = null;
      }
      state.searchField = payload;
    },
    searchServicesRequest: () => {
      // nothing
    },
    searchServicesSuccess: (state, { payload }) => {
      state.foundServices = payload;
    },
  },
});

export const {
  changeSearchField,
  searchServicesRequest,
  searchServicesSuccess,
} = searchServicesSlice.actions;

export const searchServicesReducer = searchServicesSlice.reducer;
