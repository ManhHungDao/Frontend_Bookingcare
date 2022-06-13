import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";

// slide slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import img
import imgCoXuongKhop from "../../../assets/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
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
        <div className="section">
          <div className="section-block specialty">
            <div className="section-header">
              <div className="section-title">Chuyên khoa phổ biến</div>
              <div className="section-btn">Xem thêm</div>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                <div className="section-body-content">
                  <div>
                    <img src={imgCoXuongKhop} alt="dsads" />
                  </div>
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
                <div className="section-body-content">
                  <img src={imgCoXuongKhop} />
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
                <div className="section-body-content">
                  <img src={imgCoXuongKhop} />
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
                <div className="section-body-content">
                  <img src={imgCoXuongKhop} />
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
                <div className="section-body-content">
                  <img src={imgCoXuongKhop} />
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
                <div className="section-body-content">
                  <img src={imgCoXuongKhop} />
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
                <div className="section-body-content">
                  <img src={imgCoXuongKhop} />
                  <div className="section-body-title">Cơ xương khớp</div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
