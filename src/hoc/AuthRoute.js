import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/system-login" />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(AuthRoute);
