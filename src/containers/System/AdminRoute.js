import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import TableManageUser from "./Admin/TableManageUser";
import TableManageClinic from "./Clinic/TableManageClinic";
import Dashboard from "./dashboard";
import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import AddNewUser from "./Admin/AddNewUser";
import AddClinic from "./Clinic/AddClinic";
import AddSpecialty from "./Specialty/AddSpecialty";
import CodePrice from "./Allcode/CodePrice";
import CodeProvince from "./Allcode/CodeProvince";
import CodeTime from "./Allcode/CodeTime";
import CodeSpecialty from "./Allcode/CodeSpecialty";
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
                <Route path="manage-user" element={<TableManageUser />} />
                <Route path="add-clinic" element={<AddClinic />} />
                <Route path="manage-clinic" element={<TableManageClinic />} />
                <Route path="add-specialty" element={<AddSpecialty />} />
                <Route path="manage-code-price" element={<CodePrice />} />
                <Route path="manage-code-province" element={<CodeProvince />} />
                <Route path="manage-code-time" element={<CodeTime />} />
                <Route path="manage-code-specialty" element={<CodeSpecialty />} />
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
