import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Notification = ({ isError }) => {
  const message = useSelector((state) => state.notification);

  let styleVariant = 'success';
  if (isError) {
    styleVariant = 'danger';
  }

  return (
    <div>
      {message === null ? null : (
        <Alert variant={styleVariant}>{message}</Alert>
      )}
    </div>
  );
};

export default Notification;
