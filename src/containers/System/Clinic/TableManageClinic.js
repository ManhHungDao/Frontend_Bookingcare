import React, { Component, useState, lazy } from "react";
import { FormattedMessage } from "react-intl";
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

const TableManageClinic = ({ getListClinicAction, listClinic }) => {
  const [list, setList] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
  }, []);

  useEffect(() => {
    if (listClinic) {
      let data = listClinic.map((e) => {
        return {
          id: e._id,
          name: e.name,
          address: e.address.detail,
          logo: e.logo.url,
          introduce: e.introduce,
        };
      });
      setList(data);
    }
  }, [listClinic]);

  const handleCellDoubleClick = (params) => {
    console.log(
      "🚀 ~ file: TableManageUser.js:163 ~ handleOnCellClick ~ params",
      params
    );
  };
  return (
    <>
      <Box m="20px">
        <Header title="Manage Clinics" subtitle="Managing the Clinics" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={list}
            columns={columns}
            onCellDoubleClick={handleCellDoubleClick}
            getRowHeight={() => "auto"}
            getEstimatedRowHeight={() => 200}
          />
        </Box>
      </Box>
    </>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
