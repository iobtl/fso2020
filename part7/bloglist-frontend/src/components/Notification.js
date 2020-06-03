import React from 'react';
import { useSelector } from 'react-redux';

const Notification = ({ isError }) => {
  const message = useSelector((state) => state.notification);

  let notificationStyle = {
    background: 'lightgrey',
    color: 'green',
    fontSize: 18,
    borderStyle: 'solid',
    padding: '0.8em',
    marginLeft: '0.5em',
    marginRight: '0.5em',
    borderColor: 'green',
    borderRadius: 5,
    marginBottom: '1em',
    backgroundColor: 'lightgrey',
  };

  if (isError) {
    notificationStyle = {
      ...notificationStyle,
      color: 'red',
      borderColor: 'red',
    };
  }

  return (
    <div className='notification'>
      {message === null ? null : <div style={notificationStyle}>{message}</div>}
    </div>
  );
};

export default Notification;
