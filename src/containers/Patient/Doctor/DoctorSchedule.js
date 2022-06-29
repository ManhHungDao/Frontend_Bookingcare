import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import moment from "moment";
import "./DoctorSchedule.scss";
import localization from "moment/locale/vi";

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
  setAllDay = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === languages.VI) {
        object.lable = moment(new Date()).add(i, "days").format("dddd - DD/MM");
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
    // const doctorId = this.props.doctorId;
    // if (doctorId && doctorId !== -1) {
    //   const date = event.target.value;
    //   console.log("🚀 ~ file: DoctorSchedule.js ~ line 55 ~ DoctorSchedule ~ date", date)
    //   this.props.fetchScheduleWithConditional(doctorId, date);
    // }
  };
  render() {
    const { allDays } = this.state;
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
                    <option value={item.value} key={index}>
                      {item.lable}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available"></div>
        </div>
        doctor schedule
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
