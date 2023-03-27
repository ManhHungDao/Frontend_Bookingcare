import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import HomeHeader from "./Section/Header.js";
import Footer from "./Section/Footer";
import * as actions from "../../store/actions";
import DataSection from "./Section/DataSection.js";
import "./HomePage.scss";
import useIsMobile from "../../components/useScreen/useIsMobile.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hinh2 from "../../assets/discussing.jpg";
import hinh3 from "../../assets/young-asia.jpg";
import hinh4 from "../../assets/portrait.jpg";
import Contact from "./Section/Contact";
import DoctorSection from "./Section/DoctorSection.js";
import HandbookSection from "./Section/HandbookSection";

const HomePage = ({
  listClinic,
  getListClinicHome,
  listSpecialty,
  getListSpecialtyHome,
  listUser,
  getListUserHome,
  listHandbook,
  getAllHandbookHome,
}) => {
  const [clinics, setClinics] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [users, setUsers] = useState([]);
  const [handbooks, setHandbooks] = useState([]);
  const [slide, setSlide] = useState("");
  const [showNav, setShowNav] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    getListClinicHome();
    getListSpecialtyHome();
    getListUserHome();
    getAllHandbookHome();
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
    if (listUser && listUser.length > 0)
      setUsers(
        listUser.map((e) => ({
          ...e,
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setUsers([]);
    }
    if (listHandbook && listHandbook.length > 0)
      setHandbooks(
        listHandbook.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setHandbooks([]);
    }
  }, [listClinic, listSpecialty, listUser, listHandbook]);

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
            <img className="" src={hinh4} />
          </div>
          <div>
            <img className="" src={hinh2} />
          </div>
          <div>
            <img className="" src={hinh3} />
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
      <DoctorSection
        data={users}
        titleSection={<FormattedMessage id="homepage.outstanding-doctor" />}
        slidesPerView={slide}
        navigation={showNav}
        linkItem="detail-doctor"
      />
      <HandbookSection
        data={handbooks}
        titleSection={"Cẩm nang"}
        slidesPerView={slide}
        navigation={showNav}
        linkItem="handbook"
      />
      <Footer />
      <Contact />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listClinic: state.patient.listClinic,
    listSpecialty: state.patient.listSpecialty,
    listUser: state.patient.listUser,
    listHandbook: state.patient.listHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListUserHome: () => dispatch(actions.getListUserHomePatientAction("")),
    getAllHandbookHome: () =>
      dispatch(actions.getAllHandbookHomePatientAction()),
    getListClinicHome: () => dispatch(actions.getListClinicHomePatientAction()),
    getListSpecialtyHome: () =>
      dispatch(actions.getListSpecialtyHomePatientAction("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
