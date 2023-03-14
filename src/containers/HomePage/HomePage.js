import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import HomeHeader from "./Section/Header.js";
import About from "./Section/About.js";
import Footer from "./Section/Footer";
import * as actions from "../../store/actions";
import DataSection from "./Section/DataSection.js";
import "./HomePage.scss";
import { useEffect } from "react";
import useIsMobile from "../../components/useScreen/useIsMobile.js";

const HomePage = ({
  listClinic,
  getListClinicHome,
  listSpecialty,
  getListSpecialtyHome,
}) => {
  const [clinics, setClinics] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [slide, setSlide] = useState("");
  const [showNav, setShowNav] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    getListClinicHome();
    getListSpecialtyHome();
  }, []);
  useEffect(() => {
    if (listClinic && listClinic.length > 0)
      setClinics(
        listClinic.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setClinics([]);
    }
    if (listSpecialty && listSpecialty.length > 0)
      setSpecialties(
        listSpecialty.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setSpecialties([]);
    }
  }, [listClinic, listSpecialty]);

  useEffect(() => {
    if (isMobile) {
      setSlide(2);
      setShowNav(false);
    } else {
      setSlide(4);
      setShowNav(true);
    }
  }, [isMobile]);
  return (
    <>
      <HomeHeader isShowBanner={true} />
      <DataSection
        data={specialties}
        titleSection={<FormattedMessage id="homepage.specialty-popular" />}
        slidesPerView={slide}
        navigation={showNav}
        linkItem="specialty"
      />
      <DataSection
        data={clinics}
        titleSection={<FormattedMessage id="homepage.clinic-popular" />}
        slidesPerView={slide}
        navigation={showNav}
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
    listSpecialty: state.patient.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHomePatientAction()),
    getListSpecialtyHome: () =>
      dispatch(actions.getListSpecialtyHomePatientAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
