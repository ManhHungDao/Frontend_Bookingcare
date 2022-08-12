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
import {
  getClinic,
  getListDoctorClinic,
  getDetailSpecialty,
} from "../../../services/userService";
import { toast } from "react-toastify";
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash";
class DetailClinicSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProvince: [],
      selectedProvince: "",
      clinic: {},
      listDoctorClinic: [],
      isOpen: false,
      detailSpecialty: {},
      specialty: {},
    };
  }

  async componentDidMount() {
    const { clinicId, specialtyId } = this.props.match.params;
    this.props.getDetailSpecialtyHome(specialtyId);
    const resSpe = await getDetailSpecialty(specialtyId);
    if (resSpe && resSpe.errCode === 0) {
      this.setState({
        detailSpecialty: resSpe.data,
      });
    } else {
      toast.error("Get Detail Specialty Failed");
    }
    const resCli = await getClinic(clinicId);
    if (resCli && resCli.errCode === 0)
      this.setState({
        clinic: resCli.data,
      });
    else {
      toast.error("Get Detail Clinic Failed");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.specialty !== prevProps.specialty) {
      this.setState({
        specialty: this.props.specialty,
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
    const { detailSpecialty, clinic } = this.state;
    if (clinic.introduceHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.introduce" />,
        id: "#introduce",
      });
    if (detailSpecialty.serviceHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.service" />,
        id: "#service",
      });
    if (detailSpecialty.strengthHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.strengths" />,
        id: "#strength",
      });
    if (detailSpecialty.treatmentHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.treatment" />,
        id: "#treatment",
      });
    if (detailSpecialty.examinationHTML)
      menuList.push({
        name: <FormattedMessage id="patient.detail-doctor.examination" />,
        id: "#service",
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
  render() {
    const { language } = this.props;
    const { clinic, specialty, isOpen } = this.state;
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
              <div className="name-clinic">
                {specialty.name},{clinic.name}
              </div>
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
            style={isOpen ? { height: "fit-content" } : { height: "380px" }}
          >
            {this.renderNodeClinic()}
            <div className="note-clinic">
              <p>
                Nhằm đáp ứng nhu cầu sử dụng dịch vụ y tế chất lượng cao, Bệnh
                viện Việt Đức cung cấp dịch vụ khám theo yêu cầu.
              </p>
              <p>
                Từ nay, người bệnh có thể đặt khám {this.state.specialty.name}
                thể thao tại Khu khám bệnh theo yêu cầu, Bệnh viện Hữu nghị Việt
                Đức thông qua hệ thống đặt khám BookingCare.
              </p>
              <ul>
                <li>
                  Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu
                  kinh nghiệm
                </li>
                <li>
                  Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt
                  lịch)
                </li>
                <li>
                  Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám
                  trước
                </li>
                <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
              </ul>
              <p>
                Sau khi đặt lịch, người bệnh sẽ nhận được hướng dẫn chi tiết về
                sự chuẩn bị cả TRƯỚC và TRONG KHI KHÁM để hành trình đi khám
                thuận tiện và hiệu quả hơn.
              </p>
            </div>
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
            {this.state.detailSpecialty.serviceHTML && (
              <>
                <h3 className="detail-title" id="service">
                  <FormattedMessage id="patient.detail-doctor.service" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailSpecialty.serviceHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailSpecialty.strengthHTML && (
              <>
                <h3 className="detail-title" id="strength">
                  <FormattedMessage id="patient.detail-doctor.strengths" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailSpecialty.strengthHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailSpecialty.treatmentHTML && (
              <>
                <h3 className="detail-title" id="treatment">
                  <FormattedMessage id="patient.detail-doctor.treatment" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailSpecialty.treatmentHTML,
                  }}
                ></div>
              </>
            )}
            {this.state.detailSpecialty.examinationHTML && (
              <>
                <h3 className="detail-title" id="examination">
                  <FormattedMessage id="patient.detail-doctor.examination" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailSpecialty.examinationHTML,
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

        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listProvince: state.admin.doctorProvince,
    specialty: state.admin.detailSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailSpecialtyHome: (id) =>
      dispatch(actions.getDetailSpecialtyHome(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinicSpecialty)
);
