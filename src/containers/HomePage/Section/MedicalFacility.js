import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { connect } from "react-redux";
// slide slick
import Slider from "react-slick";
import { getListClinicHomeService } from "../../../services/userService";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }
  async componentDidMount() {
    const res = await getListClinicHomeService();
    if (res && res.errCode === 0) {
      this.setState({
        listClinic: res.data,
      });
    } else {
      toast.error("get list clinic home failed");
    }
  }
  handleViewDetailClinic = (clinic) => {
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };
  render() {
    const { listClinic } = this.state;
    return (
      <>
        <div className="section section-medical">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">
                <FormattedMessage id="homepage.clinic-popular" />
              </div>
              <div className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </div>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {listClinic &&
                  listClinic.length > 0 &&
                  listClinic.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="section-customize"
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="section-body-title">{item.name}</div>
                      </div>
                    );
                  })}
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
  return {

    
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
