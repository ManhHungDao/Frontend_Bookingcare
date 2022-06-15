import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./UserRedux.scss";
import { languages } from "../../../utils";
import { getAllCodeService } from "../../../services/userService";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionArr: [],
      roleArr: [],
      genderArr: [],
    };
  }

  async componentDidMount() {
    try {
      const resGender = await getAllCodeService("gender");
      if (resGender && resGender.errCode === 0) {
        this.setState({
          genderArr: resGender.data,
        });
      }

      const resPos = await getAllCodeService("position");
      if (resPos && resPos.errCode === 0) {
        this.setState({
          positionArr: resPos.data,
        });
      }

      const resRole = await getAllCodeService("role");
      if (resRole && resRole.errCode === 0) {
        this.setState({
          roleArr: resRole.data,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UserRedux.js ~ line 27 ~ UserRedux ~ getListPosition= ~ error",
        error
      );
    }
  }

  render() {
    const listPos = this.state.positionArr;
    const listRole = this.state.roleArr;
    const listGender = this.state.genderArr;
    console.log(
      "🚀 ~ file: UserRedux.js ~ line 51 ~ UserRedux ~ render ~ listGender",
      listGender
    );
    const language = this.props.language;
    return (
      <>
        <div className="user-redux-container">
          <div className="title">user redux manage</div>
          <div className="user-redux-body">
            <div className="wrapper rounded bg-white">
              <div className="h3">
                <FormattedMessage id="manage-user.title" />
              </div>
              <div className="form">
                <div className="row">
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.firstName" />
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.lastName" />
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <div className="d-flex align-items-center mt-2">
                      {listGender &&
                        listGender.length > 0 &&
                        listGender.map((item, index) => {
                          return (
                            <label className="option ms-4" key={index}>
                              <input type="radio" name="radio" />
                              {language === languages.VI
                                ? item.valueVI
                                : item.valueEN}
                              <span className="checkmark"></span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input type="tel" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select id="sub">
                      {listRole &&
                        listRole.length > 0 &&
                        listRole.map((item, index) => {
                          return (
                            <option key={index}>
                              {language === languages.VI
                                ? item.valueVI
                                : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select id="sub">
                      {listPos &&
                        listPos.length > 0 &&
                        listPos.map((item, index) => {
                          return (
                            <option key={index}>
                              {language === languages.VI
                                ? item.valueVI
                                : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-6 mt-md-0 mt-3">
                    <label>
                      <FormattedMessage id="manage-user.avatar" />
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="btn btn-primary mt-3">
                  <FormattedMessage id="manage-user.save" />
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
