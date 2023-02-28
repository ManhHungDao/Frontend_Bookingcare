import React from "react";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import ModalManageDetailClinic from "./ModalManageDetailClinic";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../../../components/Header";
import _ from "lodash";

const TableManageSpecialty = () => {
  return <div>TableManageSpecialty</div>;
};
const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    // deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
