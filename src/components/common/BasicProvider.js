import React from "react";
import { HashRouter as Router } from "react-router-dom";

// A custom provider that includes @material-ui theme provider, redux store provider and react-router-dom Router.
export default function BasicProvider({ children }) {
  return <Router>{children}</Router>;
}
