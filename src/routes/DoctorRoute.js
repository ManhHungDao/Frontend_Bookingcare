import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import TableManageUser from "../containers/System/Admin/TableManageUser";
import Dashboard from "../containers/System/dashboard";
import ResetPassword from "../containers/Auth/ResetPassword";
import Topbar from "../containers/System/global/Topbar";
import DoctorSideBar from "../containers/System/global/DoctorSideBar";
import AddNewUser from "../containers/System/Admin/AddNewUser";
import ManageUserSchedule from "../containers/System/Admin/ManageUserSchedule";
import { CssBaseline } from "@mui/material";
import "./style.css";

const DoctorRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <CssBaseline />
      <div className="app">
        <DoctorSideBar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="manage-user-schedule"
              element={<ManageUserSchedule />}
            />
            <Route path="*" element={<Navigate replace to="/doctor" />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRoute);
