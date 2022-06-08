import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-container">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-container">
              <div className="child-content">
                <div>
                  <b className="header-title">Chuyên khoa</b>
                </div>
                <span className="subs-title">Tìm bác sĩ theo chuyên khoa</span>
              </div>
              <div className="child-content">
                <div>
                  <b className="header-title">Cơ sở y tế</b>
                </div>
                <span className="subs-title">Chọn bệnh viện phòng khám</span>
              </div>{" "}
              <div className="child-content">
                <div>
                  <b className="header-title">Bác sĩ</b>
                </div>
                <span className="subs-title">Chọn bác sĩ giỏi</span>
              </div>{" "}
              <div className="child-content">
                <div>
                  <b className="header-title">Gói khám</b>
                </div>
                <span className="subs-title">Khám sức khỏe tổng quát</span>
              </div>
            </div>
            <div className="right-container">
              <i className="fas fa-question-circle"></i>Hỗ trợ
              <div className="flag">VN</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
