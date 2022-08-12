import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, TYPE } from "../../../utils";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import SubHeader from "../../HomePage/SubHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getClinic, getListDoctorClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProvince: [],
      selectedProvince: "",
      clinic: {},
      listDoctorClinic: [],
      isOpen: false,
      detailClinic: {},
    };
  }

  async componentDidMount() {
    const clinicId = this.props.match.params.id;
    this.props.fetchInfoDoctor(TYPE.PROVINCE);
    const data = {
      clinicId: this.props.match.params.id,
      provinceId: "all",
    };
    const resDetail = await getClinic(clinicId);
    if (resDetail && resDetail.errCode === 0) {
      this.setState({
        clinic: resDetail.data,
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
    await this.props.getDetailClinic(clinicId);
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
    if (prevProps.detailClinic !== this.props.detailClinic) {
      this.setState({
        detailClinic: this.props.detailClinic,
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
  handleOpenSeeMore = () => {
    this.setState({
      isOpen: true,
    });
  };
  handleToDetailDoctor = (id) => {
    if (this.props.history) this.props.history.push(`/detail-doctor/${id}`);
  };
  renderNodeClinic = () => {
    let text;
    if (this.props.language === languages.VI)
      text =
        "BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.";
    else
      text = `BookingCare is the leading comprehensive healthcare platform in Vietnam connecting users with 150 prestigious hospitals - clinics, more than 1,000 good specialists and high quality medical products, services and products.`;

    return (
      <div>
        <div className="note-bookingcare">
          <div className="right">
            <i className="fas fa-lightbulb"></i>
          </div>
          <div className="left">{text}</div>
        </div>
      </div>
    );
  };
  renderMenuBar = () => {
    let menuList = [];
    const { detailClinic, clinic } = this.state;
    if (clinic.introduceHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.introduce" />,
        id: "#introduce",
      });
    if (detailClinic.strengthHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.strengths" />,
        id: "#strength",
      });
    if (detailClinic.equipmentHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.equipment" />,
        id: "#equipment",
      });
    if (detailClinic.serviceHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.service" />,
        id: "#service",
      });
    if (detailClinic.locationHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.location" />,
        id: "#location",
      });
    if (detailClinic.examinationHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.examination" />,
        id: "#examination",
      });
    return (
      <ul className="menu-detail">
        {menuList.map((item, index) => {
          return (
            <li key={index} onClick={this.handleOpenSeeMore}>
              <a href={item.id}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    );
  };
  handleChooseSpecialty = () => {
    if (this.props.history && this.state.clinic)
      this.props.history.push(
        `/table-clinic-specialty/${this.state.clinic.id}`
      );
  };
  renderBooking = () => {
    return (
      <div
        className="clinic-booking"
        onClick={() => this.handleChooseSpecialty()}
      >
        <span className="select-specialty">
          <FormattedMessage id="patient.detail-doctor.select-specialty" />
        </span>
      </div>
    );
  };
  render() {
    const { language } = this.props;
    const { clinic, listDoctorClinic, isOpen } = this.state;
    return (
      <>
        <SubHeader isShowSupport={true} />
        <div className="header-clinic-container grid">
          <div
            className="bg-clinic"
            style={{
              backgroundImage: `url(${clinic.image})`,
            }}
          ></div>
          <div className="wrap-clinic">
            <div
              className="lg-clinic"
              style={{
                backgroundImage: `url(${clinic.logo})`,
              }}
            ></div>
            <div className="info-clinic">
              <div className="name-clinic">{clinic.name}</div>
              <div className="address-clinic">
                <i className="fas fa-map-marker-alt"></i>
                <span>{clinic.address}</span>
              </div>
            </div>
          </div>
        </div>
        {this.renderMenuBar()}

        <div className="detail-container">
          <div
            className="detail-specialy grid"
            style={isOpen ? { height: "fit-content" } : {}}
          >
            {this.renderNodeClinic()}

            {this.state.detailClinic.noteHTML && (
              <div
                className="note-clinic"
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: this.state.detailClinic.noteHTML,
                }}
              ></div>
            )}

            <h3 className="detail-title" id="introduce">
              <FormattedMessage id="patient.detail-doctor.introduce" />
            </h3>
            {clinic && clinic.introduceHTML && (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: clinic.introduceHTML,
                }}
              ></div>
            )}
            {this.state.detailClinic.bookingHTML && (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: this.state.detailClinic.bookingHTML,
                }}
              ></div>
            )}
            {this.state.detailClinic.strengthHTML && (
              <>
                <h3 className="detail-title" id="strength">
                  <FormattedMessage id="patient.detail-doctor.strengths" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailClinic.strengthHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailClinic.equipmentHTML && (
              <>
                <h3 className="detail-title" id="equipment">
                  <FormattedMessage id="patient.detail-doctor.equipment" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailClinic.equipmentHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailClinic.serviceHTML && (
              <>
                <h3 className="detail-title" id="service">
                  <FormattedMessage id="patient.detail-doctor.service" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailClinic.serviceHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailClinic.locationHTML && (
              <>
                <h3 className="detail-title" id="location">
                  <FormattedMessage id="patient.detail-doctor.location" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailClinic.locationHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailClinic.examinationHTML && (
              <>
                <h3 className="detail-title" id="examination">
                  <FormattedMessage id="patient.detail-doctor.examination" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailClinic.examinationHTML,
                  }}
                ></div>
              </>
            )}
          </div>
          <div className="for-more grid">
            <span onClick={this.handleSeeMore}>
              {isOpen ? (
                <FormattedMessage id="patient.detail-doctor.hide" />
              ) : (
                <FormattedMessage id="patient.detail-doctor.show" />
              )}
            </span>
          </div>
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
        <HomeFooter />
        {this.renderBooking()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listProvince: state.admin.doctorProvince,
    detailClinic: state.admin.detailClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
    getDetailClinic: (id) => dispatch(actions.getDetailClinic(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
