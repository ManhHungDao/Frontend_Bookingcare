import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import TableManageUser from "./Admin/TableManageUser";
import TableManageClinic from "./Clinic/TableManageClinic";
import TableManageSpecialty from "./Specialty/TableManageSpecialty";
import Dashboard from "./dashboard";
import ResetPassword from "../Auth/ResetPassword";
import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import AddNewUser from "./Admin/AddNewUser";
import AddClinic from "./Clinic/AddClinic";
import AddSpecialty from "./Specialty/AddSpecialty";
import ManageCode from "./Allcode/ManageCode";
import AddHandbook from "./Handbook/AddHandbook";
import TableManageHandbook from "./Handbook/TableManageHandbook";
import ManageUserSchedule from "./Admin/ManageUserSchedule";
import ManagePacket from "./Clinic/ManagePacket";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./style.css";
const AdminRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="add-user" element={<AddNewUser />} />
            <Route path="manage-user" element={<TableManageUser />} />
            <Route
              path="manage-user-schedule"
              element={<ManageUserSchedule />}
            />
            <Route path="add-clinic" element={<AddClinic />} />
            <Route path="manage-clinic" element={<TableManageClinic />} />
            <Route path="manage-packet" element={<ManagePacket />} />
            <Route path="add-specialty" element={<AddSpecialty />} />
            <Route path="manage-specialty" element={<TableManageSpecialty />} />
            <Route path="manage-code-price" element={<ManageCode />} />
            <Route path="manage-code-payment" element={<ManageCode />} />
            <Route path="manage-code-province" element={<ManageCode />} />
            <Route path="manage-code-time" element={<ManageCode />} />
            <Route path="manage-code-specialty" element={<ManageCode />} />
            <Route path="add-handbook" element={<AddHandbook />} />
            <Route path="manage-handbook" element={<TableManageHandbook />} />

            {/* <Route
                  path="/manage-detail-clinic"
                  element={<ManageDetailClinic />}
                />
               
               
                <Route
                  path="/manage-detail-handbook"
                  element={ManageDetailHandbook}
                />
                <Route
                  path="/packet_examination"
                  element={Packet_examination}
                /> */}
            <Route path="*" element={<Navigate replace to="/admin" />} />
            {/* {isLoggedIn ? (
                  <Route path="*" element={<Navigate replace to="/admin" />} />
                ) : (
                  <Route path="*" element={<Navigate replace to="/login" />} />
                )} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
