import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { languages } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    console.log(
      "🚀 ~ file: Header.js ~ line 17 ~ Header ~ render ~ userInfo",
      userInfo
    );

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
          </span>
          <span
            className={language === languages.VI ? "lang-vi active" : "lang-vi"}
            onClick={() => this.changeLanguage(languages.VI)}
          >
            VN
          </span>
          <span
            className={language === languages.EN ? "lang-en active" : "lang-en"}
            onClick={() => this.changeLanguage(languages.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
