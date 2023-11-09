import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { serviceListReducer } from '../reducers/serviceList';
import { addServiceReducer } from '../reducers/addService';
import { editServiceReducer } from '../reducers/editService';

import { rootEpic } from '../epics';
import { searchServicesReducer } from '../reducers/searchServices';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    serviceList: serviceListReducer,
    addService: addServiceReducer,
    editService: editServiceReducer,
    searchServices: searchServicesReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
