import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
    };
  }

  componentDidMount() {
  
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    const { language } = this.props;

    return (
      <>
        <div className="title pt-3">
          <FormattedMessage id="manage-patient.title" />
        </div>
        <div className="manage-patient wrapper">
          <div className="row">
            <div className="col-6 form-group">
              <span>Chọn ngày khám</span>
              <DatePicker
                className="from-control"
                onChange={this.handleOnchangDatePicker}
                value={this.state.currentDate[0]}
                // minDate={new Date()}
              />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
