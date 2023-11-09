import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ServiceForm } from './ServiceForm';
import { ErrorPopup } from '../ServiceList/ErrorPopup';

import {
  changeEditServiceField,
  editServiceAsync,
  getServiceRequest,
} from '../../reducers/editService';

export const EditServiceForm = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error } = useSelector((state) => state.editService);

  const onInputChange = (name, value) => {
    dispatch(changeEditServiceField({ name, value }));
  };

  const onFormSubmit = ({ id, name, price, content }) => {
    if (name && price && content) {
      dispatch(
        editServiceAsync({ service: { id, name, price, content }, history }),
      );
    } else {
      console.log('Тут должна быть какая-нибудь модалка или попап');
    }
  };

  const onRetry = () => {
    dispatch(getServiceRequest(id));
  };

  useEffect(() => {
    dispatch(getServiceRequest(id));
  }, []);

  return (
    <>
      <ServiceForm
        type="edit"
        onInputChange={onInputChange}
        onFormSubmit={onFormSubmit}
        isLoading={loading}
      />
      {error && <ErrorPopup message={error} onRetry={onRetry} />}
    </>
  );
};
