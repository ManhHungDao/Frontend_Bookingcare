import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import HomeHeader from "./Section/Header.js";

import About from "./Section/About.js";
import Footer from "./Section/Footer";
import * as actions from "../../store/actions";
import DataSection from "./Section/DataSection.js";
import "./HomePage.scss";

// import css slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

const HomePage = ({ listClinic, getListClinicHomePatientAction }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [clinics, setClinics] = useState([]);
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);
    const handleResize = () => setIsMobile(mobileQuery.matches);
    mobileQuery.addListener(handleResize);
    return () => mobileQuery.removeListener(handleResize);
  }, []);
  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicHomePatientAction();
    else {
      setClinics(
        listClinic.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    }
  }, [listClinic]);
  return (
    <>
      <HomeHeader isShowBanner={true} />
      <DataSection
        data={clinics}
        titleSection={<FormattedMessage id="homepage.clinic-popular" />}
        slidesPerView={isMobile ? 2 : 4}
        navigation={isMobile ? false : true}
        linkItem="clinic"
      />
      <About /> 
      <Footer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listClinic: state.patient.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHomePatientAction: () =>
      dispatch(actions.getListClinicHomePatientAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
