import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import validator from "validator";
import { getAllUsersService } from "../../../services/userService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalInfo extends Component {
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
      gender: "M",
      positionId: "",
      roleId: "",
      image: "",
      errors: {},
      openModal: false,
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
        positionId: listPos && listPos.length > 0 ? listPos[0].keyMap : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      const listRole = this.props.roles;
      this.setState({
        roleArr: listRole,
        roleId: listRole && listRole.length > 0 ? listRole[1].keyMap : "",
      });
    }
    if (this.state.roleId !== prevState.roleId) {
      if (this.state.roleId === "R1") {
        this.setState({
          positionArr: [],
          positionId: "",
        });
      } else if (this.state.roleId === "R2") {
        const listPos = this.props.positions;
        this.setState({
          positionArr: listPos,
          positionId: listPos && listPos.length > 0 ? listPos[0].keyMap : "",
        });
      }
    }
    if (this.props.isAddNewUser !== prevProps.isAddNewUser) {
      if (this.props.isAddNewUser) {
        this.setState({
          previewImgUrl: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          gender: "M",
          image: "",
          errors: {},
        });
      }
    }
    if (this.props.userEdit !== prevProps.userEdit) {
      this.setState({
        email: this.props.userEdit.email,
        firstName: this.props.userEdit.firstName,
        lastName: this.props.userEdit.lastName,
        phoneNumber: this.props.userEdit.phoneNumber.replace(/\s/g, ""),
        password: "password",
        gender: this.props.userEdit.gender,
        positionId: this.props.userEdit.positionId,
        roleId: this.props.userEdit.roleId,
        image: this.props.userEdit.image,
        address: this.props.userEdit.address,
        previewImgUrl: this.props.userEdit.image,
      });
    }

    if (this.props.openModal !== prevProps.openModal) {
      this.setState({
        openModal: this.props.openModal,
      });
    }
  }

  handleChangeSelect = (selectedOption, name) => {
    this.setState({
      selectedUser: selectedOption,
    });
    this.fillDataInput(selectedOption.value);
  };

  handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const url = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: url,
        image: base64,
      });
    }
  };

  checkValidate = () => {
    let errors = {};
    let { email, password, firstName, lastName, phoneNumber, address } =
      this.state;
    const { language } = this.props;
    if (language === "en") {
      if (!email) errors.email = "Email must be entered";
      if (!validator.isEmail(email)) {
        errors.email = "Invalid email address";
      }
      if (!password) errors.password = "Password must be entered";
      if (!firstName) errors.firstName = "First name must be entered";
      if (!lastName) errors.lastName = "Last name must be entered";
      if (!phoneNumber) errors.phoneNumber = "Phone number must be entered";
      if (!validator.isMobilePhone(phoneNumber))
        errors.phoneNumber = "Invalid phone number";
      if (!address) errors.address = "Address must be entered";
    } else {
      if (!email) errors.email = "Email không được trống";
      if (!validator.isEmail(email)) {
        errors.email = "Email không hợp lệ";
      }
      if (!password) errors.password = "Mật khẩu không được trống ";
      if (!firstName) errors.firstName = "Họ không được trống";
      if (!lastName) errors.lastName = "Tên không được trống";
      if (!phoneNumber) errors.phoneNumber = "Số điện thoại không được trống";
      if (!validator.isMobilePhone(phoneNumber))
        errors.phoneNumber = "Số điện thoại không hợp lệ";
      if (!address) errors.address = "Địa chỉ không được trống ";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  handleSave = () => {
    /*    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    const listPos = this.props.positions;
    const listRole = this.props.roles;
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    let data = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      gender: this.state.gender,
      positionId: this.state.positionId,
      roleId: this.state.roleId,
      image: this.state.image,
      address: this.state.address,
    };
    // check add or eidt
    if (this.props.isAddNewUser) {
      this.props.createNewUser({
        ...data,
      });
    } else {
      this.props.editUser({
        id: this.props.userEdit ? this.props.userEdit.id : null,
        ...data,
      });
    } */
    this.props.closeModal();
  };

  handleOnClickGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    copyState.errors[id] = "";
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeOption = (event) => {
    console.log(event.target);
  };
  handleEditUser = (user) => {
    let copyState = { ...this.state };
    copyState = {
      userEditId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      password: "password",
      gender: user.gender,
      positionId: user.positionId,
      roleId: user.roleId,
      image: user.image,
      address: user.address,
      action: CRUD_ACTIONS.EDIT,
      previewImgUrl: user.image,
    };
    this.setState({
      ...copyState,
    });
  };

  render() {
    const { positionArr, roleArr, genderArr } = this.state;
    const language = this.props.language;
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      roleId,
      positionId,
      errors,
    } = this.state;
    console.log("this.props.isAddNewUser", this.props.isAddNewUser);
    return (
      <>
        <Modal
          isOpen={this.state.openModal}
          toggle={() => {
            this.props.closeModal();
          }}
          centered
          size={"lg"}
          className="custom-modal-style"
        >
          <ModalHeader
            toggle={() => {
              this.props.closeModal();
            }}
          >
            <FormattedMessage id="manage-user.title" />
          </ModalHeader>
          <ModalBody>
            <div className="user-redux-container">
              <div className="user-redux-body">
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
                      {errors.firstName && (
                        <span className="text-danger">{errors.firstName}</span>
                      )}
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
                      {errors.lastName ? (
                        <span className="text-danger">{errors.lastName}</span>
                      ) : (
                        ""
                      )}
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
                      {errors.phoneNumber ? (
                        <span className="text-danger">
                          {errors.phoneNumber}
                        </span>
                      ) : (
                        ""
                      )}
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
                              <label className="option ms-4" key={item.keyMap}>
                                <input
                                  type="radio"
                                  name="radio"
                                  value={item.keyMap}
                                  checked={item.keyMap === this.state.gender}
                                  onChange={(event) =>
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
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT
                            ? "disabled"
                            : false
                        }
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "email")
                        }
                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label>
                        <FormattedMessage id="manage-user.password" />
                      </label>
                      <input
                        disabled={!this.props.isAddNewUser ? "disabled" : false}
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "password")
                        }
                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
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
                      {errors.address && (
                        <span className="text-danger">{errors.address}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mt-md-0 mt-3">
                      <p className="mb-0">
                        <FormattedMessage id="manage-user.role" />
                      </p>
                      <select
                        id="sub"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "roleId")
                        }
                        value={roleId}
                      >
                        {roleArr &&
                          roleArr.length > 0 &&
                          roleArr.map((item, index) => {
                            return (
                              <option key={item.keyMap} value={item.keyMap}>
                                {language === languages.VI
                                  ? item.valueVI
                                  : item.valueEN}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-md-3 mt-md-0 mt-3">
                      <p className="mb-0">
                        <FormattedMessage id="manage-user.position" />
                      </p>
                      <select
                        id="sub"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "positionId")
                        }
                        value={positionId}
                      >
                        {positionArr &&
                          positionArr.length > 0 &&
                          positionArr.map((item, index) => {
                            return (
                              <option key={item.keyMap} value={item.keyMap}>
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
                          <FormattedMessage id="manage-user.upload" />
                          <i className="fas fa-upload"></i>
                        </label>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImgUrl})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSave()}>
              {this.props.isAddNewUser ? (
                <FormattedMessage id="admin.manage-clinic.add" />
              ) : (
                <FormattedMessage id="admin.manage-clinic.save" />
              )}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
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
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (user) => dispatch(actions.createNewUser(user)),
    editUser: (user) => {
      dispatch(actions.editUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInfo);
