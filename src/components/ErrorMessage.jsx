import React from "react";
import { useSelector } from "react-redux";

export const Error = () => { //{ message }
  const message = useSelector(state => state.error)
  
  if (message === null) return null;
  console.log(message)

  return (
    <div className="error">
      <h3>{message}</h3>
    </div>
  );
};
