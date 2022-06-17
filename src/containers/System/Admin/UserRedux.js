import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./UserRedux.scss";
import { languages } from "../../../utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionArr: [],
      roleArr: [],
      genderArr: [],
      previewImgUrl: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      positionId: "",
      roleId: "",
      image: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genderArr: this.props.genders,
      });
    }
    if (prevProps.positions !== this.props.positions) {
      const listPos = this.props.positions;
      this.setState({
        positionArr: listPos,
        positionId: listPos && listPos.length > 0 ? listPos[0].key : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      const listRole = this.props.roles;
      this.setState({
        roleArr: listRole,
        roleId: listRole && listRole.length > 0 ? listRole[0].key : "",
      });
    }
  }

  handleOnChangeImage = (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: url,
        image: file,
      });
    }
  };

  openReviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  checkValidate = () => {
    const arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is requied: ", arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSave = (event) => {
    const checkValidInPut = this.checkValidate();
    if (checkValidInPut === false) return;
    const data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      passaddressword: this.state.passaddressword,
      gender: this.state.gender,
      positionId: this.state.positionId,
      roleId: this.state.roleId,
      image: this.state.image,
    };
    console.log("🚀 ~ file: UserRedux.js ~ line 113 ~ UserRedux ~ data", data)
    this.props.createNewUser(data);
  };

  handleOnClickGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleOnChangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeOption = (event) => {
    console.log(event.target);
  };
  render() {
    const { positionArr, roleArr, genderArr } = this.state;
    const { isLoadingGender, isLoadingPosition, isLoadingRole } = this.props;
    const language = this.props.language;
    const { email, password, firstName, lastName, phoneNumber, address } =
      this.state;
    return (
      <>
        <div className="user-redux-container">
          <div className="title">user redux manage</div>
          <div>{isLoadingGender === true ? "loading gender" : ""}</div>
          <div>{isLoadingPosition === true ? "loading position" : ""}</div>
          <div>{isLoadingRole === true ? "loading role" : ""}</div>
          <div className="user-redux-body">
            <div className="wrapper rounded bg-white">
              <div className="h3">
                <FormattedMessage id="manage-user.title" />
              </div>
              <div className="form">
                <div className="row">
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.firstName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.lastName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "lastName")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <div className="d-flex align-items-center mt-2">
                      {genderArr &&
                        genderArr.length > 0 &&
                        genderArr.map((item, index) => {
                          return (
                            <label className="option ms-4" key={item.key}>
                              <input
                                type="radio"
                                name="radio"
                                value={item.key}
                                onClick={(event) =>
                                  this.handleOnClickGender(event)
                                }
                              />
                              {language === languages.VI
                                ? item.valueVI
                                : item.valueEN}
                              <span className="checkmark"></span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "password")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      value={address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      id="sub"
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "roleId")
                      }
                    >
                      {roleArr &&
                        roleArr.length > 0 &&
                        roleArr.map((item, index) => {
                          return (
                            <option key={item.key} value={item.key}>
                              {language === languages.VI
                                ? item.valueVI
                                : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="sub"
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "positionId")
                      }
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.map((item, index) => {
                          return (
                            <option key={item.key} value={item.key}>
                              {language === languages.VI
                                ? item.valueVI
                                : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.avatar" />
                    </label>
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <div className="preview-img-container">
                      <label className="lable-upload" htmlFor="previewImg">
                        Tải ảnh
                        <i className="fas fa-upload"></i>
                      </label>
                      <div
                        className="preview-image"
                        style={{
                          backgroundImage: `url(${this.state.previewImgUrl})`,
                        }}
                        onClick={() => this.openReviewImage()}
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="btn btn-primary mt-3"
                  onClick={() => this.handleSave()}
                >
                  <FormattedMessage id="manage-user.save" />
                </div>
              </div>
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    positions: state.admin.positions,
    roles: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    isLoadingPosition: state.admin.isLoadingPosition,
    isLoadingRole: state.admin.isLoadingRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
