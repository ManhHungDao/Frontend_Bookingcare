import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import _ from "lodash";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import NumberFormat from "react-number-format";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  toggle = () => {
    this.props.closeModalBooking();
  };
  render() {
    const { language } = this.props;
    const isOpen = this.props.isOpenModelBooking;
    const dataTime = this.props.dataScheduleTimeModal;
    const doctor_info = this.props.doctor_info;
    const doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    const currentLang = language === languages.VI ? "valueVI" : "valueEN";
    const price =
      doctor_info && doctor_info.priceTypeData
        ? doctor_info.priceTypeData[currentLang]
        : "";
    return (
      <>
        <Modal size="lg" isOpen={isOpen} centered>
          <ModalHeader toggle={() => this.toggle()}>
            Thông tin đặt lịch khám bệnh
          </ModalHeader>
          <div className="doctor-info">
            <ProfileDoctor
              doctorId={doctorId}
              isShowDescription={false}
              dataTime={dataTime}
            />
          </div>
          <div className="price">
            <i className="fas fa-dot-circle"></i>Giá khám
            <span>
              <NumberFormat
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                value={price}
                suffix={language === languages.VI ? "VNĐ" : "$"}
              />
            </span>
          </div>
          <div className="price-examination"></div>
          <div className="row">
            <div className="col-6 form-group">
              <label>Họ tên</label>
              <input className="form-control" />
            </div>
            <div className="col-6 form-group">
              <label>Tên</label>
              <input className="form-control" />
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ</label>
              <input className="form-control" />
            </div>
            <div className="col-6 form-group">
              <label>Số điện thoại</label>
              <input className="form-control" />
            </div>
            <div className="col-12 form-group">
              <label>Lý do khám</label>
              <input className="form-control" />
            </div>
          </div>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
            >
              Save
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
