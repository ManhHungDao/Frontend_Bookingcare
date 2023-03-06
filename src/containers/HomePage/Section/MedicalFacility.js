import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../store/actions";
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./style.scss";
import { isMobile } from "react-device-detect";
const MedicalFacility = ({ listClinic, getListClinicAction }) => {
  const [data, setData] = useState([]);
  const handleClick = (id) => {};
  const handleClickViewMore = () => {};
  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    else {
      setData(
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
      <div className="section section-medical">
        <div className="container">
          <div className="section-header">
            <div className="title-section">
              <FormattedMessage id="homepage.clinic-popular" />
            </div>
            <div className="btn-section" onClick={() => handleClickViewMore()}>
              <FormattedMessage id="homepage.more-info" />
            </div>
          </div>
          <div className="section-body">
            <Swiper
              slidesPerView={isMobile ? 3 : 4}
              spaceBetween={15}
              navigation={isMobile ? false : true}
              modules={[Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-size": "40px",
              }}
            >
              {data &&
                data.length > 0 &&
                data.map((e, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="section-customize"
                      onClick={() => handleClick(e)}
                    >
                      <img src={e.image} alt="e.name" />
                      <div className="section-body-title">{e.name}</div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
