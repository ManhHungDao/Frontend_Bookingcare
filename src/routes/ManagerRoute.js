import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../containers/System/dashboard";
import ResetPassword from "../containers/Auth/ResetPassword";
import Topbar from "../containers/System/global/Topbar";
import ManagerSideBar from "../containers/System/global/ManagerSideBar";
import AddHandbook from "../containers/System/Handbook/AddHandbook";
import TableManageHandbook from "../containers/System/Handbook/TableManageHandbook";
import ManageUserSchedule from "../containers/System/Admin/ManageUserSchedule";
import ManagePacketSchedule from "../containers/System/Clinic/ManagePacketSchedule";
import AddPacket from "../containers/System/Clinic/AddPacket";
import TableManagePacket from "../containers/System/Clinic/TableManagePacket";
import { CssBaseline } from "@mui/material";
import "./style.css";
const ManagerRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <CssBaseline />
      <div className="app">
        <ManagerSideBar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="manage-user-schedule"
              element={<ManageUserSchedule />}
            />
            <Route path="add-packet" element={<AddPacket />} />
            <Route path="manage-packet" element={<TableManagePacket />} />
            <Route
              path="add-packet-schedule"
              element={<ManagePacketSchedule />}
            />
            <Route path="add-handbook" element={<AddHandbook />} />
            <Route path="manage-handbook" element={<TableManageHandbook />} />
            <Route path="*" element={<Navigate replace to="/manager" />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerRoute);
