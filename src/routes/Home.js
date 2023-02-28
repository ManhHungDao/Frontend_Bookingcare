import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn } = this.props;
    let linkToRedirect = isLoggedIn ? "/admin" : "/";
    return <Navigate to={linkToRedirect} replace />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
