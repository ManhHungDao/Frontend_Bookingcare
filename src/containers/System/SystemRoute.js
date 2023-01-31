import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import TableManageUser from "./Admin/TableManageUser";
import Header from "../Header/Header";
import ManageDoctor from "./Admin/ManageDoctor";
import ManageSpecialty from "./Specialty/ManageSpecialty";
import TableManageClinic from "./Clinic/TableManageClinic";
import ManageDetailClinic from "./Clinic/ManageDetailClinic";
import ManageDetailSpecialty from "./Specialty/ManageDetailSpecialty";
import ManageHandbook from "./Handbook/ManageHandbook";
import ManageDetailHandbook from "./Handbook/ManageDetailhandbook"; //commnet nek
import Packet_examination from "./Packet_examination/Packet_examination";
import Dashboard from "./dashboard";
import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import AddNewUser from "./Admin/AddNewUser";
// import ManageDetailHandbook from "../containers/"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./style.css";
const SystemRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {/* {isLoggedIn && <Header />} */}
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              {/* {userInfo && userInfo.roleId === USER_ROLE.ADMIN && ( */}
              <Switch>
                <Route exact path="/system" component={Dashboard} />
                <Route  path="/system/add-user" component={AddNewUser} />
                <Route path="/system/user-manage" component={TableManageUser} />
                <Route path="/system/manage-doctor" component={ManageDoctor} />
                <Route
                  path="/system/manage-clinic"
                  component={TableManageClinic}
                />
                <Route
                  path="/system/manage-handbook"
                  component={ManageHandbook}
                />
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
                  path="/system/manage-detail-handbook"
                  component={ManageDetailHandbook}
                />
                <Route
                  path="/system/packet_examination"
                  component={Packet_examination}
                />

                <Route
                  component={() => {
                    return <Redirect to={systemMenuPath} />;
                  }}
                />
              </Switch>
              {/* )} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemRoute);
