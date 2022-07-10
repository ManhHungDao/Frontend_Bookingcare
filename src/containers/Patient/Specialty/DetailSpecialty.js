import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrdoctorId: [15, 42, 41],
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const { language } = this.props;
    const { arrdoctorId } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detail-specialy-container grid">
          <div className="detail-specialy-container grid">
            {arrdoctorId &&
              arrdoctorId.length > 0 &&
              arrdoctorId.map((item, index) => {
                return (
                  <div className="section" key={index}>
                    <div className="info-doctor">
                      <ProfileDoctor doctorId={item} isShowDescription={true} />
                    </div>
                    <div className="schedule-doctor">
                      <DoctorSchedule doctorId={item} />
                      <hr />
                      <DoctorExtraInfo doctorId={item} />
                    </div>
                  </div>
                );
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
