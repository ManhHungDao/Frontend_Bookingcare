import React, { Component } from "react";
import { connect } from "react-redux";
// slide slick
import Slider from "react-slick";
import { languages } from "../../../utils";

import * as action from "../../../store/actions";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidMount() {
    this.props.fetchTopDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listTopDoctor !== this.props.listTopDoctor) {
      this.setState({
        arrDoctor: this.props.listTopDoctor,
      });
    }
  }
  render() {
    const { arrDoctor } = this.state;
    const { language } = this.props;
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
                {arrDoctor &&
                  arrDoctor.length > 0 &&
                  arrDoctor.map((item, index) => {
                    let nameVI = `${item.positionData.valueVI} || ${item.firstName} ${item.lastName} `;
                    let nameEN = `${item.positionData.valueEN} || ${item.lastName} ${item.firstName}`;
                    let imgBase64 = "";
                    if (item.image) {
                      imgBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div className="section-customize" key={index}>
                        <div className="outer-bg">
                          <div
                            className="bg-image"
                            style={{ backgroundImage: `url(${imgBase64})` }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div className="section-body-title">
                            {language === languages.VI ? nameVI : nameEN}
                          </div>
                          <div className="section-body-sub-title">
                            Backend Developer
                          </div>
                        </div>
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
    language: state.app.language,
    listTopDoctor: state.admin.listTopDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctor: () => dispatch(action.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
