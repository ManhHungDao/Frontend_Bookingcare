import React, { Component } from "react";
import { connect } from "react-redux";
// slide slick
import Slider from "react-slick";
class MedicalFacility extends Component {
  render() {
    return (
      <>
        <div className="section-specialty">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">Cơ sở y tế nổi bật</div>
              <div className="btn-section">Xem thêm</div>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 1
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 12
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 13
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 14
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 15
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 16
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 17
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
