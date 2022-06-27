import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      selectedDoctor: null,
      currentDate: "",
      allScheduleTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctors !== this.props.doctors) {
      let listDoctor = this.props.doctors;
      const dataSelect = this.buildDataInputSelect(listDoctor.data);
      this.setState({
        doctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let listDoctor = this.props.doctors;
      const dataSelect = this.buildDataInputSelect(listDoctor.data);
      this.setState({
        doctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({
        allScheduleTime: this.props.allScheduleTime.data,
      });
    }
  }
  buildDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let lableVi = `${item.firstName} ${item.lastName}`;
        let lableEn = `${item.lastName} ${item.firstName}`;
        let object = {
          label: language === languages.VI ? lableVi : lableEn,
          value: item.id,
        };
        result.push(object);
      });
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnchangDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    const { selectedDoctor, doctors, allScheduleTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="title">
          <FormattedMessage id="manage-schedu.title" />
        </div>
        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-6 from-group">
                <FormattedMessage id="manage-schedu.select-doctor" />

                <Select
                  value={selectedDoctor}
                  onChange={this.handleChange}
                  options={doctors}
                />
              </div>
              <div className="col-6 from-group">
                <FormattedMessage id="manage-schedu.select-day" />
                <DatePicker
                  className="from-control"
                  onChange={this.handleOnchangDatePicker}
                  value={this.state.currentDate[0]}
                  minDate={new Date()}
                />
              </div>
              <div className="col-12 pick-hour-container mt-5">
                {allScheduleTime &&
                  allScheduleTime.length > 0 &&
                  allScheduleTime.map((item) => {
                    return (
                      <button className="btn btn-warning" key={item.id}>
                        {language === languages.VI
                          ? item.valueVI
                          : item.valueEN}
                      </button>
                    );
                  })}
              </div>
            </div>
            <button className="btn btn-primary mt-5">
              <FormattedMessage id="manage-schedu.save" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctors: state.admin.doctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
