/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changLanguageApp } from "../../../store/actions";
// import icon optianal
// import iconHospital from "../../assets/icon-optinal/hospital.png";
// import iconDichVuXetNghiem from "../../assets/icon-optinal/dichvuxetnghiem.png";
// import iconKhamNhaKhoa from "../../assets/icon-optinal/khamnhakhoa.png";
// import iconKhamTaiNha from "../../assets/icon-optinal/khamtainha.png";
// import iconKhamTongQuat from "../../assets/icon-optinal/khamtongquat.png";
// import iconPhauThuat from "../../assets/icon-optinal/phau-thuat.jpg";
// import iconDienThoai from "../../assets/icon-optinal/phone.png";
// import iconSucKhoeTinhThan from "../../assets/icon-optinal/suckhoetinhthan.png";

import hinh1 from "../../../assets/header-background.jpg";
import hinh2 from "../../../assets/hospital-search.jpg";
import hinh3 from "../../../assets/dich-vu-tai-nha-2.jpg";
import hinh4 from "../../../assets/quy-trinh-kham-benh-va-nhung-dieu-can-luu-y-1.jpg";
import { Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./style.scss";
import useIsTablet from "../../../components/useScreen/useIsTablet.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeHeader = ({ changLanguageAppRedux, language }) => {
  const smScreen = useIsTablet();
  const navigate = useNavigate();

  const changeLanguage = (language) => {
    changLanguageAppRedux(language);
  };
  const returnHome = () => {
    navigate(`/`);
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <>
      <div className="home-header-container d-flex align-items-center">
        <div className="container">
          <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              sx={{
                cursor: "pointer",
              }}
            >
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={returnHome}></div>
            </Grid>
            {!smScreen && (
              <Grid
                item
                md={6}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
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
              </Grid>
            )}
            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              sx={{
                fontWeight: "bold",
                gap: "10px",
              }}
            >
              <Stack
                display={"flex"}
                alignItems={"center"}
                sx={{
                  cursor: "pointer",
                  borderRight: "2px #000 solid",
                  paddingRight: "8px",
                }}
              >
                <i className="fas fa-question-circle icon-support"></i>
                <span className="support-text">
                  <FormattedMessage id="home-header.support" />
                </span>
              </Stack>
              <div
                className={
                  language === languages.VI ? "lang-vi active" : "lang-vi"
                }
              >
                <span onClick={() => changeLanguage(languages.VI)}>VN</span>
              </div>
              <div
                className={
                  language === languages.EN ? "lang-en active" : "lang-en"
                }
              >
                <span onClick={() => changeLanguage(languages.EN)}>EN</span>
              </div>
            </Grid>
          </Grid>
        </div>
        <Slider {...settings}>
          <div>
            <img className="" src={hinh1} />
          </div>
          <div>
            <img className="" src={hinh2} />
          </div>
          <div>
            <img className="" src={hinh3} />
          </div>
          <div>
            <img className="" src={hinh4} />
          </div>
        </Slider>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
