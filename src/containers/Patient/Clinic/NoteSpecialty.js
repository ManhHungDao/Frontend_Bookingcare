import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./noteSpecialty.scss";
import { FormattedMessage } from "react-intl";

class NoteSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const { language } = this.props;

    return (
      <>
        <p>
          Hàng nghìn người bệnh đến khám tại Bệnh viện Chợ Rẫy mỗi ngày. Nhằm
          nâng cao chất lượng dịch vụ và hỗ trợ người bệnh tốt hơn, Bệnh viện
          Chợ Rẫy triển khai đặt khám online thông qua Nền tảng Đặt khám
          BookingCare.
        </p>
        <p>
          Để giảm thời gian chờ đợi và nhận được hướng dẫn đi khám tại Bệnh viện
          Chợ Rẫy, người bệnh vui lòng:
        </p>
        <ul>
          <li>Chọn chuyên khoa phù hợp cần đi khám</li>
          <li>Chọn thời gian đặt khám</li>
          <li>Đặt hẹn online trước khi đến khám</li>
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteSpecialty);
