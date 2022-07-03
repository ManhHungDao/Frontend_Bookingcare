import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.fetchDetaiInfoDoctor(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }
  render() {
    const { detailDoctor } = this.state;
    let nameVI, nameEN;
    if (detailDoctor && detailDoctor.positionData) {
      nameVI = `${detailDoctor.positionData.valueVI} || ${detailDoctor.firstName} ${detailDoctor.lastName} `;
      nameEN = `${detailDoctor.positionData.valueEN} || ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    const { language } = this.props;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container ">
          <div className="intro-doctor grid">
            <div
              className="left bg-image"
              style={{
                backgroundImage: `url(${
                  detailDoctor.image && detailDoctor.image
                    ? detailDoctor.image
                    : ""
                })`,
              }}
            ></div>
            <div className="right">
              <div className="r-up">
                {language === languages.VI ? nameVI : nameEN}
              </div>
              <div className="r-down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <div>{detailDoctor.Markdown.description} </div>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor grid">
            <div className="left">
              <DoctorSchedule
                doctorId={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
            <div className="right">
              <DoctorExtraInfo
                doctorId={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
          </div>
          <div className="bg-container">
            <hr />
            <div className="detail-info-doctor grid">
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.contentMarkdown && (
                  <div
                    contentEditable="true"
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.Markdown.contentMarkdown,
                    }}
                  ></div>
                )}
            </div>
            <hr />
          </div>
          <div className="comment-doctor grid"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetaiInfoDoctor: (id) => dispatch(actions.fetchDetaiInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
