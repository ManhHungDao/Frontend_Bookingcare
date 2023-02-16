/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import { languages } from "../../utils";
import { changLanguageApp, getSpecialtiesHome } from "../../store/actions";
import { withRouter } from "react-router-dom";
// import icon optianal
import iconHospital from "../../assets/icon-optinal/hospital.png";
import iconDichVuXetNghiem from "../../assets/icon-optinal/dichvuxetnghiem.png";
import iconKhamNhaKhoa from "../../assets/icon-optinal/khamnhakhoa.png";
import iconKhamTaiNha from "../../assets/icon-optinal/khamtainha.png";
import iconKhamTongQuat from "../../assets/icon-optinal/khamtongquat.png";
import iconPhauThuat from "../../assets/icon-optinal/phau-thuat.jpg";
import iconDienThoai from "../../assets/icon-optinal/phone.png";
import iconSucKhoeTinhThan from "../../assets/icon-optinal/suckhoetinhthan.png";

import hinh1 from "../../assets/header-background.jpg";
import hinh2 from "../../assets/hospital-search.jpg";
import hinh3 from "../../assets/dich-vu-tai-nha-2.jpg";
import hinh4 from "../../assets/quy-trinh-kham-benh-va-nhung-dieu-can-luu-y-1.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./HomeHeader.scss";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  returnHome = () => {
    if (this.props.history) this.props.history.push(`/home`);
  };
  renderListSelect = (type) => {
    if (this.props.history) this.props.history.push(`/render-list/${type}`);
  };
  componentDidMount() {
    this.props.getSpecialtiesHome();
  }
  handleselect = (data) => {
    if (this.props.history)
      this.props.history.push(`/detail-specialty/${data.value}`);
  };

  render() {
    const options = this.props.listSpecialty.map((item) => {
      return { label: item.name, value: item.id };
    });
    const language = this.props.language;
    const placeHolder =
      this.props.language === languages.VI
        ? "Tìm chuyên khoa khám bệnh..."
        : "Find specialties...";
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content container">
            <div className="left-container">
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={this.returnHome}></div>
            </div>
            <div className="center-container">
              <div
                className="child-content"
                onClick={() => {
                  this.renderListSelect("specialty");
                }}
              >
                <div>
                  <b className="header-title">
                    <FormattedMessage id="home-header.specialty" />
                  </b>
                </div>
                <span className="subs-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </span>
              </div>
              <div
                className="child-content"
                onClick={() => {
                  this.renderListSelect("clinic");
                }}
              >
                <div>
                  <b className="header-title">
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <span className="subs-title">
                  <FormattedMessage id="home-header.select-room" />
                </span>
              </div>
              <div
                className="child-content"
                onClick={() => {
                  this.renderListSelect("doctor");
                }}
              >
                <div>
                  <b className="header-title">
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <span className="subs-title">
                  <FormattedMessage id="home-header.select-doctor" />
                </span>
              </div>
              <div
                className="child-content"
                onClick={() => {
                  this.renderListSelect("packet");
                }}
              >
                <div>
                  <b className="header-title">
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <span className="subs-title">
                  <FormattedMessage id="home-header.check-health" />
                </span>
              </div>
            </div>
            <div className="right-container">
              <i className="fas fa-question-circle"></i>
              <span className="support-text">
                <FormattedMessage id="home-header.support" /> |
              </span>
              <div
                className={
                  language === languages.VI ? "lang-vi active" : "lang-vi"
                }
              >
                <span onClick={() => this.changeLanguage(languages.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === languages.EN ? "lang-en active" : "lang-en"
                }
              >
                <span onClick={() => this.changeLanguage(languages.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-down">
              <div className="options">
                <div className="options-child">
                  <div
                    className="icon-child child1"
                    style={{
                      backgroundImage: `url(${iconHospital})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-1" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconDienThoai})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-2" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconKhamTongQuat})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-3" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconDichVuXetNghiem})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-4" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconSucKhoeTinhThan})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-5" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconKhamNhaKhoa})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-6" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconPhauThuat})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-7" />
                  </div>
                </div>
                <div className="options-child">
                  <div
                    className="icon-child "
                    style={{
                      backgroundImage: `url(${iconKhamTaiNha})`,
                    }}
                  ></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.optinal-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="" src={hinh1} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="" src={hinh2} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="" src={hinh3} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="" src={hinh4} />
          </SwiperSlide>
        </Swiper>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    listSpecialty: state.admin.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
    getSpecialtiesHome: () => dispatch(getSpecialtiesHome()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
