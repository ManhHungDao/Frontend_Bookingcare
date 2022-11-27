import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { languages } from "../../../../utils";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import _ from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import NumberFormat from "react-number-format";
import DatePicker from "../../../../components/Input/DatePicker";
import moment from "moment";
import validator from "validator";
import ReCAPTCHA from "react-google-recaptcha";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "M",
      doctorId: "",
      genders: "",
      timeType: "",
      doctorName: "",
      errors: {},
      verfied: false,
    };
  }

  componentDidMount() {
    this.props.fetchGenderStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.props.genders,
      });
    }
    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      const dataTime = this.props.dataScheduleTimeModal;
      if (dataTime && !_.isEmpty(dataTime)) {
        this.setState({
          doctorId: dataTime.doctorId,
          timeType: dataTime.timeType,
        });
      }
    }
  }
  checkValidate = () => {
    let errors = {};
    let { email, fullName, phoneNumber, address, birthday, reason } =
      this.state;
    const { language } = this.props;
    if (language === "en") {
      if (!email) errors.email = "Email must be entered";
      if (!validator.isEmail(email)) {
        errors.email = "Invalid email address";
      }
      if (!fullName) errors.fullName = "Name must be entered";
      if (!phoneNumber) errors.phoneNumber = "Phone number must be entered";
      if (!validator.isMobilePhone(phoneNumber))
        errors.phoneNumber = "Invalid phone number";
      if (!address) errors.address = "Address must be entered";
      if (!birthday) errors.birthday = "Birthday must be entered";
      if (!reason) errors.reason = "Reason must be entered";
    } else {
      if (!email) errors.email = "Email không được trống";
      if (!validator.isEmail(email)) {
        errors.email = "Email không hợp lệ";
      }
      if (!fullName) errors.fullName = "Tên không được trống";
      if (!phoneNumber) errors.phoneNumber = "Số điện thoại không được trống";
      if (!validator.isMobilePhone(phoneNumber))
        errors.phoneNumber = "Số điện thoại không hợp lệ";
      if (!address) errors.address = "Địa chỉ không được trống";
      if (!birthday) errors.birthday = "Ngày sinh không được trống";
      if (!reason) errors.reason = "Lý do khám không được trống";
    }
    return errors;
  };

  toggle = () => {
    this.props.closeModalBooking();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnClickGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  renderPrice = () => {
    const { language, doctor_info } = this.props;
    const currentLang = language === languages.VI ? "valueVI" : "valueEN";
    const price =
      doctor_info && doctor_info.priceTypeData
        ? doctor_info.priceTypeData[currentLang]
        : "";
    return (
      <>
        <NumberFormat
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          value={price}
          suffix={language === languages.VI ? "VNĐ" : "$"}
        />
      </>
    );
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  buildTimeBooking = (dataTime) => {
    const { language } = this.props;
    const date =
      language === languages.VI
        ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
        : moment
            .unix(+dataTime.date / 1000)
            .locale("en")
            .format("ddd - MM/DD/YYYY");
    const time =
      language === languages.VI
        ? dataTime.timeTypeData.valueVI
        : dataTime.timeTypeData.valueEN;
    if (dataTime && !_.isEmpty(dataTime)) {
      return `${time} - ${this.capitalizeFirstLetter(date)}`;
    }
    return "";
  };
  buildNameDoctor = (dataTime) => {
    const { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      const nameVI = `${dataTime.doctorData.firstName}${dataTime.doctorData.lastName} `;
      const nameEN = `${dataTime.doctorData.lastName}${dataTime.doctorData.firstName}`;
      const name = language === languages.VI ? nameVI : nameEN;
      return name;
    }
    return "";
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  handleSaveUser = () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    let date = this.props.dataScheduleTimeModal.date;
    const timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
    const doctorName = this.buildNameDoctor(this.props.dataScheduleTimeModal);
    let data = {
      email: this.state.email,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    };
    this.props.createBookingAppointment(data);
    this.setState({
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "M",
    });
  };
  onChange = (value) => {
    this.setState({
      verfied: true,
    });
  };
  render() {
    const { language, isOpenModelBooking, dataScheduleTimeModal, isShowPrice } =
      this.props;
    const { genders, doctorId, errors } = this.state;
    return (
      <>
        <Modal size="lg" isOpen={isOpenModelBooking} centered>
          <ModalHeader toggle={() => this.toggle()}>
            <FormattedMessage id="patient.booking-modal.title" />
          </ModalHeader>
          <div className="doctor-info">
            <ProfileDoctor
              doctorId={doctorId}
              isShowDescription={false}
              dataTime={dataScheduleTimeModal}
            />
          </div>
          {isShowPrice && isShowPrice === true && (
            <div className="price">
              <i className="fas fa-dot-circle"></i>
              <FormattedMessage id="patient.booking-modal.price" />
              <span>{this.renderPrice()}</span>
            </div>
          )}
          <div className="price-examination"></div>
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.name" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "fullName")
                }
                value={this.state.fullName}
              />
              {errors.fullName && (
                <span className="text-danger">{errors.fullName}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.gender" />
              </label>
              <div className="d-flex align-items-center mt-2">
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return (
                      <label className="option ms-4" key={item.keyMap}>
                        <input
                          type="radio"
                          name="radio"
                          value={item.keyMap}
                          checked={item.keyMap === this.state.gender}
                          onChange={(event) => this.handleOnClickGender(event)}
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
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.email" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.address" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
              {errors.address && (
                <span className="text-danger">{errors.address}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.phoneNumer" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "phoneNumber")
                }
                value={this.state.phoneNumber}
              />
              {errors.phoneNumber && (
                <span className="text-danger">{errors.phoneNumber}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.birthday" />
              </label>
              <div className="custom-style-datepicker">
                <DatePicker
                  onChange={this.handleOnchangDatePicker}
                  value={this.state.birthday}
                />
              </div>
              {errors.birthday && (
                <span className="text-danger">{errors.birthday}</span>
              )}
            </div>
            <div className="col-12 form-group mb-3">
              <label>
                <FormattedMessage id="patient.booking-modal.reason" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "reason")}
                value={this.state.reason}
              />
              {errors.reason && (
                <span className="text-danger">{errors.reason}</span>
              )}
            </div>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={this.onChange}
          />
          </div>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
              disabled={!this.state.verfied}
            >
              <FormattedMessage id="patient.booking-modal.save" />
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    createBookingAppointment: (data) =>
      dispatch(actions.createBookingAppointment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
