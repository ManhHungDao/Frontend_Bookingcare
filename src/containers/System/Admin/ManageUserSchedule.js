import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import _ from "lodash";

const ManageUserSchedule = ({ user }) => {
  useEffect(() => {
    if (!_.isEmpty(user)) {
    }
  }, []);


  return (
    <>
      <Box m="20px">
        <Header title="Quản lý lịch khám bệnh" />
      
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUserSchedule);
