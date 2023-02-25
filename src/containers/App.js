import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import CustomScrollbars from "../components/CustomScrollbars";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";
import Login from "./Auth/login";
import SystemRoute from "./System/SystemRoute";
import Doctor from "../routes/Doctor";
import PatientRoute from "./Patient/PatientRoute";
import Loading from "../components/Loading";
import HomePage from "./HomePage/HomePage";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  // PrivateAdminRoute({ children }) {
  //   const auth = useAuth();
  //   return auth ? children : <Navigate to="/login" />;
  // }
  //  PrivateDoctorRoute({ children }) {
  //   const auth = useAuth();
  //   return auth ? children : <Navigate to="/login" />;
  // }

  render() {
    return (
      <BrowserRouter>
        <>
          <Loading />
          <Router history={history}>
            <Routes>
              <Route path={path.HOME} element={<PatientRoute />} />
              <Route path={path.LOGIN} element={<Login />} />
              {/* <Route
                path={path.ADMIN}
                element={userIsAuthenticated(<SystemRoute />)}
              />
              <Route
                path={path.DOCTOR}
                element={userIsAuthenticated(<Doctor />)}
              /> */}
              <Route path={path.ADMIN} element={<SystemRoute />} />
              {/* <Route
                path={path.DOCTOR}
                element={
                  <PrivateRoute>
                    <Doctor />
                  </PrivateRoute>
                }
              /> */}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Router>
        </>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
