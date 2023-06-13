import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../containers/System/dashboard";
import ResetPassword from "../containers/Auth/ResetPassword";
import Topbar from "../containers/System/global/Topbar";
import DoctorSideBar from "../containers/System/global/DoctorSideBar";
import { CssBaseline } from "@mui/material";
import MyInfo from "../containers/System/Doctor/MyInfo";
import "./style.css";

const AssistantRoute = ({ systemMenuPath, isLoggedIn }) => {
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
            <Route path="view-myinfo" element={<MyInfo />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate replace to="/assistant" />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AssistantRoute);
