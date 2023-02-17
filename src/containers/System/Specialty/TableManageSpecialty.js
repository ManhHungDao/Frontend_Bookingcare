import React from "react";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import ModalManageDetailClinic from "./ModalManageDetailClinic";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../../../components/Header";
import _ from "lodash";
const columns = [
  {
    field: "name",
    headerName: "Tên",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    flex: 1,
  },
  {
    field: "logo",
    headerName: "Hình ảnh",
    flex: 1,
    renderCell: ({ row: { logo } }) => {
      return (
        <Box>
          <img src={logo} alt="Logo CLinic" width="120px" height="60px" />
        </Box>
      );
    },
  },
  {
    field: "introduce",
    headerName: "Giới thiệu",
    flex: 2,
    renderCell: ({ row: { introduce } }) => {
      return <span dangerouslySetInnerHTML={{ __html: introduce }}></span>;
    },
  },
];
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
