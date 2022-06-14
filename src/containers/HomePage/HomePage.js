import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader.js";
import Specialty from "./Section/specialty";
import MedicalFacility from "./Section/MedicalFacility.js";
import OutStandingDoctor from "./Section/OutStandingDoctor.js";
import "./HomePage.scss";

// import css slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
