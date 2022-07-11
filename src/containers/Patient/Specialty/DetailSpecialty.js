import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, TYPE } from "../../../utils";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import Select from "react-select";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrdoctorId: [15, 42, 41],
      listProvince: [],
      selectedProvince: "",
    };
  }

  componentDidMount() {
    this.props.fetchInfoDoctor(TYPE.PROVINCE);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.listProvince !== this.props.listProvince) {
      let listProvince = this.props.listProvince;
      const dataSelect = this.buildDataInputSelect(listProvince);
      this.setState({
        listProvince: dataSelect,
      });
    }
  }
  buildDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    let lableVi, lableEn, object;
    data.forEach((item) => {
      lableVi = `${item.valueVI}`;
      lableEn = `${item.valueEN}`;
      object = {
        label: language === languages.VI ? lableVi : lableEn,
        value: item.keyMap,
      };
      result.push(object);
    });
    return result;
  };
  handleChangeSelect = (selectedOption, name) => {
    const stateName = name.name;
    const copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  render() {
    const { language } = this.props;
    const { arrdoctorId } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detail-specialy-container grid">
          <div style={{ width: "161px" }}>
            <Select
              name="selectedProvince"
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelect}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select_province_placeholder" />
              }
            />
          </div>
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
    listProvince: state.admin.doctorProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
