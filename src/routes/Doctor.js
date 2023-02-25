import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
class Doctor extends Component {
  render() {
    const { isLoggedIn, doctorMenuPath } = this.props;

    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Routes>
              <Route path="/doctor/manage-schedule" element={ManageSchedule} />
              <Route path="/doctor/manage-patient" element={ManagePatient} />
              <Route
                element={() => {
                  return <Link to={doctorMenuPath} />;
                }}
              />
            </Routes>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorMenuPath: state.app.doctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
