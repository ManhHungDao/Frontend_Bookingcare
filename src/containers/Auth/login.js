import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="login-backround">
          <div className="login-conainer">
            <div className="login-content row">
              <div className="col-12 text-login">Login</div>
              <div className="col-12 form-group login-input">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="col-12">
                <button className="btn-login">Login</button>
              </div>
              <div className="col-12 ">
                <span className="forgot-password">Forgot your password</span>
              </div>
              <div className="col-12 mt-3 text-center">
                <span className="">Or login with</span>
              </div>
              <div className="col-12 social-login text-center">
                <i class="fab fa-google-plus"></i>
                <i class="fab fa-facebook"></i>
                <i class="fab fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
