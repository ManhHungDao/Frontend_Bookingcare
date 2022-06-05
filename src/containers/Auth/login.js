import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./login.scss";
import { dateFilter } from "react-bootstrap-table2-filter";
import { handleLoginApi } from "../../services/userService";

// import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "daomanhhung1202@gmail.com",
      password: "123456",
      isShowPassword: false,
    };
  }

  handleOnChangeUserName = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = async () => {
    try {
      await handleLoginApi(this.state.email, this.state.password)
    } catch (error) {
    console.log("🚀 ~ file: login.js ~ line 44 ~ Login ~ handleLogin= ~ error", error)
    }
  };
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
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeUserName(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangePassword(event)}
                  />
                  <span onClick={() => this.handleShowHidePassword()}>
                    <i
                      class={
                        this.state.isShowPassword
                          ? "fas fa-eye-slash"
                          : "fas fa-eye"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
              <div className="col-12 ">
                <span className="forgot-password">Forgot your password</span>
              </div>
              <div className="col-12 mt-3 text-center">
                <span className="">Or login with</span>
              </div>
              <div className="col-12 social-login text-center">
                <i className="fab fa-google-plus"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-twitter"></i>
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
