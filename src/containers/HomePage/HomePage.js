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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hinh1 from "../../assets/header-background.jpg";
import hinh2 from "../../assets/hospital-search.jpg";
import hinh3 from "../../assets/dich-vu-tai-nha-2.jpg";
import hinh4 from "../../assets/quy-trinh-kham-benh-va-nhung-dieu-can-luu-y-1.jpg";
import Contact from "./Section/Contact";

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
      <HomeHeader isShowBanner={true} />
      <div className="home-header-container__slider">
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
      <Contact />
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
