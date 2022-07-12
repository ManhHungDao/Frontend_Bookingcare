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
      detailSpecialty: {},
      listDoctorSpecialty: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const specialtyId = this.props.match.params.id;
    this.props.fetchInfoDoctor(TYPE.PROVINCE);
    this.props.getDetailSpecialtyHome(specialtyId);
    const data = {
      specialtyId: this.props.match.params.id,
      provinceId: "all",
    };
    this.props.getListDoctorSpecialtyHome(data);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.detailSpecialty !== prevProps.detailSpecialty) {
      this.setState({
        detailSpecialty: this.props.detailSpecialty,
      });
    }
    if (this.props.listDoctorSpecialty !== prevProps.listDoctorSpecialty) {
      this.setState({
        listDoctorSpecialty: this.props.listDoctorSpecialty,
      });
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
    let data = {
      specialtyId: this.props.match.params.id,
      provinceId: selectedOption.value,
    };
    this.props.getListDoctorSpecialtyHome(data);
    const stateName = name.name;
    const copyState = { ...this.state };
    copyState[stateName] = selectedOption;

    this.setState({
      ...copyState,
    });
  };
  handleSeeMore = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { language } = this.props;
    const { arrdoctorId, detailSpecialty, listDoctorSpecialty, isOpen } =
      this.state;
    return (
      <>
        <HomeHeader />
        <div
          className="detail-specialy grid"
          style={isOpen ? { height: "fit-content" } : {}}
        >
          {detailSpecialty && detailSpecialty.contentMarkdown && (
            <div
              contentEditable="true"
              dangerouslySetInnerHTML={{
                __html: detailSpecialty.contentMarkdown,
              }}
            ></div>
          )}
        </div>
        <div className="for-more grid">
          <span onClick={this.handleSeeMore}>
            {isOpen ? "Ẩn bớt" : " Xem thêm"}
          </span>
        </div>
        <div className="body-container">
          <div className="detail-specialy-container grid">
            <div style={{ width: "161px", paddingTop: "10px" }}>
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
              {listDoctorSpecialty &&
                listDoctorSpecialty.length > 0 &&
                listDoctorSpecialty.map((item, index) => {
                  return (
                    <div className="section" key={index}>
                      <div className="info-doctor">
                        <ProfileDoctor
                          doctorId={item.doctorId}
                          isShowDescription={true}
                        />
                      </div>
                      <div className="schedule-doctor">
                        <DoctorSchedule doctorId={item.doctorId} />
                        <hr />
                        <DoctorExtraInfo doctorId={item.doctorId} />
                      </div>
                    </div>
                  );
                })}
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
    listProvince: state.admin.doctorProvince,
    detailSpecialty: state.admin.detailSpecialty,
    listDoctorSpecialty: state.admin.listDoctorSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
    getDetailSpecialtyHome: (id) =>
      dispatch(actions.getDetailSpecialtyHome(id)),
    getListDoctorSpecialtyHome: (data) =>
      dispatch(actions.getListDoctorSpecialtyHome(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
