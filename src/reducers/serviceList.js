import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

export const serviceListSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    addService: (state, { payload }) => {
      const { id, name, price, content } = payload;
      const newService = { id, name, price: Number(price), content };
      state.services.push(newService);
    },
    getServicesRequest: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    getServicesSuccess: (state, { payload }) => {
      state.services = payload;
      state.loading = false;
      state.error = null;
    },
    getServicesFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    removeServiceSuccess: (state, { payload }) => {
      state.services = state.services.filter(
        (service) => service.id !== payload,
      );
    },
    editService: (state, { payload }) => {
      const serviceIndex = state.services.findIndex(
        (service) => service.id === payload.id,
      );
      state.services[serviceIndex] = payload;
    },
  },
});

export const {
  addService,
  editService,
  getServicesSuccess,
  getServicesRequest,
  getServicesFailure,
  removeServiceSuccess,
} = serviceListSlice.actions;

export const serviceListReducer = serviceListSlice.reducer;
