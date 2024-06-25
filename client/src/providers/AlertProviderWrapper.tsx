// AlertProviderWrapper.js
import React, { ReactNode } from "react";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const AlertProviderWrapper = ({ children }: { children: ReactNode }) => (
  <AlertProvider template={AlertTemplate} {...options}>
    {children}
  </AlertProvider>
);

export default AlertProviderWrapper;
