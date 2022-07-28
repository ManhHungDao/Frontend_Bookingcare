import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageDetailClinic from "../containers/System/Clinic/ManageDetailClinic";
import ManageDetailSpecialty from "../containers/System/Specialty/ManageDetailSpecialty";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route
                path="/system/manage-detail-clinic"
                component={ManageDetailClinic}
              />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route
                path="/system/manage-detail-specialty"
                component={ManageDetailSpecialty}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
