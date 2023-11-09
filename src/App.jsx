import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom';

import { FilterServices } from './components/ServiceList/FilterServices';
import { AddServiceModal, EditServiceModal } from './components/Modal/Modal';
import { ServiceList } from './components/ServiceList/ServiceList';
import { LoadingSpinner } from './components/ServiceList/LoadingSpinner';
import { ErrorPopup } from './components/ServiceList/ErrorPopup';

import { getServicesRequest } from './reducers/serviceList';

import './styles/app.css';

export const App = () => {
  const dispatch = useDispatch();

  const { services, loading, error } = useSelector(
    (state) => state.serviceList,
  );
  const { foundServices } = useSelector((state) => state.searchServices);

  const onRetry = () => {
    dispatch(getServicesRequest());
  };

  useEffect(() => {
    dispatch(getServicesRequest());
  }, [dispatch]);

  return (
    <Router>
      <Route exact path={['/']}>
        <Redirect to={process.env.REACT_APP_HOMEPAGE} />
      </Route>
      {loading ? (
        <LoadingSpinner radius="20" width="5" color="rgb(210, 70, 75)" />
      ) : error ? (
        <ErrorPopup message={error} onRetry={onRetry} />
      ) : (
        <div className="services-app">
          <Link
            to={`${process.env.REACT_APP_HOMEPAGE}/add`}
            className="add-service_link"
          >
            <button className="add-service_btn">Add new service</button>
          </Link>
          <FilterServices />
          <ServiceList services={foundServices || services} />
          <Switch>
            <Route
              path={`${process.env.REACT_APP_HOMEPAGE}/add`}
              component={AddServiceModal}
            ></Route>
            <Route
              path={`${process.env.REACT_APP_HOMEPAGE}/:id`}
              component={EditServiceModal}
            ></Route>
          </Switch>
        </div>
      )}
    </Router>
  );
};
