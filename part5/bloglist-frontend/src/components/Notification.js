import React from 'react';

const Notification = ({ message, isError }) => {
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
    <div>
    {message === null 
    ? null
    : <div style={notificationStyle}>{message}</div>}
    </div>
  )
};

export default Notification;
