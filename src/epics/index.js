import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  filter,
  debounceTime,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { getServiceFailure, getServiceSuccess } from '../reducers/editService';

import {
  searchServicesSuccess,
  searchServicesRequest,
} from '../reducers/searchServices';

import {
  getServicesFailure,
  getServicesSuccess,
  removeServiceSuccess,
} from '../reducers/serviceList';

export const getServicesEpic = (action$) =>
  action$.pipe(
    ofType('serviceList/getServicesRequest'),
    switchMap((_) =>
      ajax.getJSON(`${process.env.REACT_APP_API_SERVICES}?fortune`).pipe(
        map((o) => getServicesSuccess(o)),
        catchError((e) => of(getServicesFailure(e.message))),
      ),
    ),
  );

export const removeServiceEpic = (action$) =>
  action$.pipe(
    ofType('serviceList/removeService'),
    map((o) => o.payload),
    switchMap((id) =>
      ajax
        .delete(`${process.env.REACT_APP_API_SERVICES}/${id}`)
        .pipe(map(() => id)),
    ),
    map((id) => removeServiceSuccess(id)),
  );

export const getServiceEpic = (action$) =>
  action$.pipe(
    ofType('editService/getServiceRequest'),
    map((o) => o.payload),
    switchMap((o) =>
      ajax.getJSON(`${process.env.REACT_APP_API_SERVICES}/${o}?fortune`).pipe(
        map((o) => getServiceSuccess(o)),
        catchError((e) => of(getServiceFailure(e.message))),
      ),
    ),
  );

export const changeSearchEpic = (action$) =>
  action$.pipe(
    ofType('searchServices/changeSearchField'),
    map((o) => o.payload.trim()),
    filter((o) => o !== ''),
    debounceTime(600),
    map((o) => searchServicesRequest(o)),
  );

export const searchServicesEpic = (action$) =>
  action$.pipe(
    ofType('searchServices/searchServicesRequest'),
    map((o) => o.payload),
    map((o) => new URLSearchParams({ q: o })),
    switchMap((o) =>
      ajax
        .getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`)
        .pipe(map((o) => searchServicesSuccess(o))),
    ),
  );

export const rootEpic = combineEpics(
  changeSearchEpic,
  searchServicesEpic,
  getServicesEpic,
  removeServiceEpic,
  getServiceEpic,
);
