import React, { Component } from "react";
import { connect } from "react-redux";
// slide slick
import Slider from "react-slick";
class OutStandingDoctor extends Component {
  render() {
    return (
      <>
        <div className="section section-doctor">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">Bác sĩ nổi bật tuần qua</div>
              <div className="btn-section">Tìm kiếm</div>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 1
                  </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
