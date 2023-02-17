import React, { Component, useState, lazy } from "react";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalManageDetailClinic from "./ModalManageDetailClinic";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, Button } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { tokens } from "../theme";
import Header from "../../../components/Header";
import _ from "lodash";
import "./TableManageClinic.scss";
import { Stack } from "@mui/system";

const TableManageClinic = ({ getListClinicAction, listClinic }) => {
  const [list, setList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    // {
    //   field: "introduce",
    //   headerName: "Giới thiệu",
    //   flex: 2,
    //   renderCell: ({ row: { introduce } }) => {
    //     return <span dangerouslySetInnerHTML={{ __html: introduce }}></span>;
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickEdit = (e) => {
          const currentRow = params.row;
          console.log("edit Id", currentRow.id);
        };
        const onClickDelete = (e) => {
          const currentRow = params.row;
          console.log("delete Id", currentRow.id);
        };

        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onClickEdit}
            >
              Sửa
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onClickDelete}
            >
              Xóa
            </Button>
          </Stack>
        );
      },
    },
  ];
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
