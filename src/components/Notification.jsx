import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => { //{ message }
  const message = useSelector(state => state.notification)
  if (message === null) return null;

  return (
    <div className="notification">
      <h3>{message}</h3>
    </div>
  );
};
