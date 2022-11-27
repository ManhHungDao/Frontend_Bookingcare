import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import {
  handleemailForgetPass,
  updatePass,
  checkMailExist,
} from "../../services/userService";
import "./login.scss";
// import { dateFilter } from "react-bootstrap-table2-filter";
import { handleLoginApiService } from "../../services/userService";
import { toast } from "react-toastify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "daomanhhung1202@gmail.com",
      password: "123456",
      isShowPassword: false,
      errMessage: "",
      isShowForgetPass: false,
      emailForgetPass: "",
      codeOTP: "",
      otp: "",
      isShowinputUpdatepass: false,
      newPass: "",
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
  handleemailForgetPass = (event, name) => {
    if (name === "emailForgetPass")
      this.setState({
        emailForgetPass: event.target.value,
      });
    if (name === "newPass")
      this.setState({
        newPass: event.target.value,
      });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      const data = await handleLoginApiService(
        this.state.email,
        this.state.password
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data)
          this.setState({
            errMessage: e.response.data.message,
          });
      }
    }
  };

  handleisShowForgetPass = () => {
    this.setState({
      isShowForgetPass: !this.state.isShowForgetPass,
    });
  };

  handleSendMail = async (email) => {
    const res = await checkMailExist(email);
    if (res && res.errCode === 0 && res.message === false) {
      toast.error(`Email is not exist`);
      return;
    }
    this.setState({
      isShowinputUpdatepass: !this.state.isShowinputUpdatepass,
    });
    let otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    this.setState({
      codeOTP: otp,
    });
    handleemailForgetPass(email, otp);
  };

  hadnleOnChangeInputOtp = (value) => {
    this.setState({
      otp: parseInt(value),
    });
  };

  handleupdatePass = async (pass) => {
    if (this.state.codeOTP !== this.state.otp) {
      toast.error("Wrong OTP");
      return;
    }
    if (this.state.newPass === "") {
      toast.error("Invalid Password");
      return;
    }
    const res = await updatePass(this.state.emailForgetPass, pass);
    if (res && res.errCode !== 1 && res.errCode !== -1)
      toast.success("Update password success");
    else {
      toast.error("Update password failed");
    }
  };
  render() {
    return (
      <>
        <div className="login-backround">
          <div className="login-conainer">
            <div className="login-content row">
              {this.state.isShowForgetPass ? (
                <div className="forgot-password-container">
                  <div className="col-12 form-group login-input">
                    <label htmlFor="forgetpass">Enter your email:</label>
                    <input
                      onChange={(event) =>
                        this.handleemailForgetPass(event, "emailForgetPass")
                      }
                      type="email"
                      name="forgetpass"
                      className="form-control"
                      value={this.state.emailForgetPass}
                    />
                  </div>
                  <div className="col-12" style={{ color: "red" }}>
                    {this.state.errMessage}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      this.handleSendMail(this.state.emailForgetPass)
                    }
                  >
                    Send OTP
                  </button>
                  {this.state.isShowinputUpdatepass && (
                    <>
                      <div className="col-12 form-group login-input">
                        <label htmlFor="OTP">OTP:</label>
                        <input
                          name="OTP"
                          className="form-control"
                          onChange={(event) =>
                            this.hadnleOnChangeInputOtp(event.target.value)
                          }
                          type="text"
                        />
                      </div>
                      <div className="col-12 form-group login-input">
                        <label htmlFor="OTP">Nhập mật khẩu mới :</label>
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.newPass}
                          onChange={(event) =>
                            this.handleemailForgetPass(event, "newPass")
                          }
                        />
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() =>
                            this.handleupdatePass(this.state.newPass)
                          }
                        >
                          Change Password
                        </button>
                      </div>
                    </>
                  )}
                  <div className="col-12 ">
                    <span
                      onClick={() => {
                        this.handleisShowForgetPass();
                      }}
                      className="forgot-password"
                    >
                      Login
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* <div className="col-12 text-login">Login</div> */}
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
                        // onKeyDown={this.handleKeyDown}
                      />
                      <span onClick={() => this.handleShowHidePassword()}>
                        <i
                          className={
                            this.state.isShowPassword
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-12" style={{ color: "red" }}>
                    {this.state.errMessage}
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
                    <span
                      onClick={() => {
                        this.handleisShowForgetPass();
                      }}
                      className="forgot-password"
                    >
                      Forgot your password
                    </span>
                  </div>
                </>
              )}

              {/*  <div className="col-12 mt-3 text-center">
                <span className="">Or login with</span>
              </div>
              <div className="col-12 social-login text-center">
                <i className="fab fa-google-plus"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-twitter"></i>
              </div> */}
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
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
