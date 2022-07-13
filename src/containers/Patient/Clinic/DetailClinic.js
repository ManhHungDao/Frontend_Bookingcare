import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, TYPE } from "../../../utils";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailClinic,
  getListDoctorClinic,
} from "../../../services/userService";
import { toast } from "react-toastify";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProvince: [],
      selectedProvince: "",
      detailClinic: {},
      listDoctorClinic: [],
      isOpen: false,
    };
  }

  async componentDidMount() {
    const clinicId = this.props.match.params.id;
    this.props.fetchInfoDoctor(TYPE.PROVINCE);
    const data = {
      clinicId: this.props.match.params.id,
      provinceId: "all",
    };
    const resDetail = await getDetailClinic(clinicId);
    if (resDetail && resDetail.errCode === 0) {
      this.setState({
        detailClinic: resDetail.data,
      });
    } else {
      toast.error("Get detail clinic failed");
    }
    const res = await getListDoctorClinic(data);
    if (res && res.errCode === 0) {
      this.setState({
        listDoctorClinic: res.data,
      });
    } else {
      toast.error("Get list doctor clinic failed");
    }
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
  handleChangeSelect = async (selectedOption, name) => {
    let data = {
      clinicId: this.props.match.params.id,
      provinceId: selectedOption.value,
    };
    const res = await getListDoctorClinic(data);
    if (res && res.errCode === 0) {
      this.setState({
        listDoctorClinic: res.data,
      });
    } else {
      toast.error("Get list doctor clinic failed");
    }
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
  handleToDetailDoctor = (id) => {
    if (this.props.history) this.props.history.push(`/detail-doctor/${id}`);
  };
  render() {
    const { language } = this.props;
    const { detailClinic, listDoctorClinic, isOpen } = this.state;
    return (
      <>
        <HomeHeader />
        <div
          className="detail-specialy grid"
          style={isOpen ? { height: "fit-content" } : {}}
        >
          {detailClinic && detailClinic.contentMarkdown && (
            <div
              contentEditable="true"
              dangerouslySetInnerHTML={{
                __html: detailClinic.contentMarkdown,
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
              {listDoctorClinic &&
                listDoctorClinic.length > 0 &&
                listDoctorClinic.map((item, index) => {
                  return (
                    <div className="section" key={index}>
                      <div
                        className="info-doctor"
                        onDoubleClick={() =>
                          this.handleToDetailDoctor(item.doctorId)
                        }
                      >
                        <ProfileDoctor
                          doctorId={item.doctorId}
                          isShowDescription={true}
                        />
                      </div>
                      <div className="schedule-doctor">
                        <DoctorSchedule
                          doctorId={item.doctorId}
                          doctor_info={item}
                        />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
