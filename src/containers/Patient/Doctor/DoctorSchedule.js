import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import moment from "moment";
import "./DoctorSchedule.scss";
import localization from "moment/locale/vi";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      doctorSchedule: [],
    };
  }

  componentDidMount() {
    this.setAllDay();
    // this.fetchSchedule();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setAllDay();
    }
    if (this.props.doctorSchedule !== prevProps.doctorSchedule) {
      this.setState({
        doctorSchedule: this.props.doctorSchedule,
      });
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setAllDay = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === languages.VI) {
        const lable = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.lable = this.capitalizeFirstLetter(lable);
      } else {
        object.lable = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays,
    });
  };
  fetchSchedule = (date) => {
    const doctorId = this.props.doctorId;
    if (doctorId && doctorId !== -1) {
      this.props.fetchScheduleWithConditional(doctorId, date);
    }
  };
  handleOnChangeSelect = (event) => {
    this.fetchSchedule(event.target.value);
  };
  render() {
    const { allDays, doctorSchedule } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="doctor-schelude-container">
          <div className="all-schedule">
            <select
              className="old-select"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option className="sl-option" value={item.value} key={index}>
                      {item.lable}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available">
            <div className="text-calender">
              <div className="calender">
                <i className="fas fa-calendar-alt"> </i>
                <span>Lịch khám</span>
              </div>
              <div className="time-content">
                {doctorSchedule &&
                  doctorSchedule.length > 0 ?
                  doctorSchedule.map((item, index) => {
                    let timeDisplay =
                      language === languages.VI
                        ? item.timeTypeData.valueVI
                        : item.timeTypeData.valueEN;
                    return (
                      <button className="btn btn-warning" key={index}>
                        {timeDisplay}
                      </button>
                    );
                  }) : <div className="notify">Không có lịch hẹn.</div>}
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
    doctorSchedule: state.admin.doctorSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduleWithConditional: (doctorId, date) =>
      dispatch(actions.fetchScheduleWithConditional(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
