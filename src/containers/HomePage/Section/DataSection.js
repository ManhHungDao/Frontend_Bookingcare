import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./style.scss";

const DataSection = ({
  data,
  titleSection,
  nameBtn,
  linkViewMore,
  linkItem,
  slidesPerView,
  navigation,
}) => {
  const history = useHistory();
  const handleClickViewMore = () => {
    // history.push("/path_to_redirect");
  };
  const handleClickItem = (e) => {
    // history.push("/path_to_redirect");
  };
  return (
    <div className="section-data">
      <div className="container">
        <div className="container__header d-flex justify-content-between align-items-center mb-2">
          <div className="container__header--title">{titleSection}</div>
          <div
            className="container__header--btn"
            onClick={() => handleClickViewMore()}
          >
            {nameBtn ? nameBtn : <FormattedMessage id="homepage.more-info" />}
          </div>
        </div>
        <div className="container__body">
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={15}
            navigation={navigation}
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
                    className="container__body--item"
                    onClick={() => handleClickItem(e)}
                  >
                    <img src={e.image} alt={e.name} />
                    <div className="container__body--item--title">{e.name}</div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DataSection;
