import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";



// import icon optianal
import iconHospital from "../../assets/icon-optinal/hospital.png";
import iconDichVuXetNghiem from "../../assets/icon-optinal/dichvuxetnghiem.png";
import iconKhamNhaKhoa from "../../assets/icon-optinal/khamnhakhoa.png";
import iconKhamTaiNha from "../../assets/icon-optinal/khamtainha.png";
import iconKhamTongQuat from "../../assets/icon-optinal/khamtongquat.png";
import iconPhauThuat from "../../assets/icon-optinal/phau-thuat.jpg";
import iconDienThoai from "../../assets/icon-optinal/phone.png";
import iconSucKhoeTinhThan from "../../assets/icon-optinal/suckhoetinhthan.png";

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
              </div>
              <div className="child-content">
                <div>
                  <b className="header-title">Bác sĩ</b>
                </div>
                <span className="subs-title">Chọn bác sĩ giỏi</span>
              </div>
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
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title title1">NỀN TẢNG Y TẾ</div>
            <div className="title title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="options-child">
                  <div
                    className="icon-child child1"
                    style={{
                      backgroundImage: `url(${iconHospital})`,
                    }}
                  ></div>
                <div className="text-child">
                  Khám <br /> Chuyên khoa
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconDienThoai})`,
                  }}
                ></div>
                <div className="text-child">
                  Khám
                  <br /> từ xa
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconKhamTongQuat})`,
                  }}
                ></div>
                <div className="text-child">
                  Khám
                  <br /> tổng quát
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconDichVuXetNghiem})`,
                  }}
                ></div>
                <div className="text-child">
                  Xét nghiệm <br /> y học
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconSucKhoeTinhThan})`,
                  }}
                ></div>
                <div className="text-child">
                  Sức khỏe
                  <br /> tinh thần
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconKhamNhaKhoa})`,
                  }}
                ></div>
                <div className="text-child">
                  Khám
                  <br /> nha Khoa
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconPhauThuat})`,
                  }}
                ></div>
                <div className="text-child">
                  Gói <br /> phẫu thuật
                </div>
              </div>
              <div className="options-child">
                <div
                  className="icon-child "
                  style={{
                    backgroundImage: `url(${iconKhamTaiNha})`,
                  }}
                ></div>
                <div className="text-child">
                  Sản phẩm
                  <br /> y tế
                </div>
              </div>
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
