import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import TableManageUser from "./Admin/TableManageUser";
import ManageSpecialty from "./Specialty/ManageSpecialty";
import TableManageClinic from "./Clinic/TableManageClinic";
import ManageDetailSpecialty from "./Specialty/ManageDetailSpecialty";
import ManageHandbook from "./Handbook/ManageHandbook";
import ManageDetailHandbook from "./Handbook/ManageDetailhandbook"; //commnet nek
import Packet_examination from "./Packet_examination/Packet_examination";
import Dashboard from "./dashboard";
import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import AddNewUser from "./Admin/AddNewUser";
import AddClinic from "./Clinic/AddClinic";
import AddEditSpecialty from "./Specialty/AddEditSpecialty";
import DetailUser from "./Admin/DetailUser";
import DetailClinic from "./Clinic/DetailClinic";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./style.css";
const AdminRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="add-user" element={<AddNewUser />} />
                <Route path="detail-user" element={<DetailUser />} />
                <Route path="manage-user" element={<TableManageUser />} />
                <Route path="add-clinic" element={<AddClinic />} />
                <Route path="manage-clinic" element={<TableManageClinic />} />
                <Route path="detail-clinic" element={<DetailClinic />} />
                <Route path="manage-handbook" element={<ManageHandbook />} />
                <Route path="manage-specialty" element={<AddEditSpecialty />} />
                {/* <Route
                  path="/manage-detail-clinic"
                  element={<ManageDetailClinic />}
                />
               
                <Route
                  path="/manage-detail-specialty"
                  element={<ManageDetailSpecialty />}
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
        </ThemeProvider>
      </ColorModeContext.Provider>
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
