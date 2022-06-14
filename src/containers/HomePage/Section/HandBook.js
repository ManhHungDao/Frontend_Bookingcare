/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

// slide slick
import Slider from "react-slick";
class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section section-handbook">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">Cẩm nang</div>
              <div className="btn-section">tất cả bài viết</div>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 1
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 12
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 13
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 14
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 15
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image"></div>
                  <div className="section-body-title">
                    Hệ thống Y tế Thu Cúc 16
                  </div>
                </div>
                <div className="section-customize">
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
