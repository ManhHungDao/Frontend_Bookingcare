import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DoctorExtraInfo.scss";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleShowHideDetail = () => {
    this.setState({
      isShowDetail: !this.state.isShowDetail,
    });
  };
  render() {
    const { language } = this.props;
    const { isShowDetail } = this.state;
    return (
      <>
        <div className="doctor-extra-info-contrainer">
          <div className="content-up">
            <h5 className="content-title">địa chỉ khám</h5>
            <div className="content-name">
              Phòng khám Bệnh viện Đại học Y Dược 1
            </div>
            <div className="content-address">
              20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM
            </div>
          </div>
          <hr />
          <div className="content-down">
            {isShowDetail ? (
              <div>
                <h5 className="content-title">giá khám:</h5>
                <div className="content-price">
                  <div className="name">Giá khám</div>
                  <div className="price">250.000đ</div>
                </div>
                <div className="content-info-payment">
                  Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
                </div>
                <div
                  className="content-close"
                  onClick={this.handleShowHideDetail}
                >
                  Ẩn bảng giá
                </div>
              </div>
            ) : (
              <h5 className="content-title">
                giá khám: 250.000d.
                <span
                  className="view-detail"
                  onClick={this.handleShowHideDetail}
                >
                  Xem chi tiết
                </span>
              </h5>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
