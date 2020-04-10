import React from "react";
import AppContext from "../context/appContext";

export const AppProvider = ({ children, ...values }) => {
  return (
    <AppContext.Provider value={values}>{children}</AppContext.Provider>
  );
};
