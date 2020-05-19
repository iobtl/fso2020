import React from "react";

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    background: "lightgrey",
    color: "green",
    fontSize: 18,
    borderStyle: "solid",
    padding: "0.8em",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    borderColor: "green",
    borderRadius: 5,
    marginBottom: "1em",
    backgroundColor: "lightgrey",
  };

  if (isError === true) {
    const errorStyle = {
      ...notificationStyle,
      color: "red",
      borderColor: "red",
    };
    return <div style={errorStyle}>{message}</div>;
  }

  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
