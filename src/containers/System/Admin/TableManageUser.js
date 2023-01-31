import React, { Component, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../../components/Header.jsx";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";

const TableManageUser = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [listSeach, setListSeach] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEdit, setUserEdit] = useState({});
  const [userDelete, setUserDelete] = useState({});
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const role = [
    { id: "R1", name: "admin" },
    { id: "R2", name: "doctor" },
    { id: "R3", name: "users" },
  ];

  const columns = [
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "firstName",
      headerName: "Họ",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 2,
    },
    {
      field: "roleId",
      headerName: "Quyền",
      flex: 1,
      renderCell: ({ row: { roleId } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              roleId === "R1"
                ? colors.greenAccent[500]
                : roleId === "R2"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {roleId === "R1" && <AdminPanelSettingsOutlinedIcon />}
            {roleId === "R2" && <SecurityOutlinedIcon />}
            {roleId === "R3" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role &&
                role.map((i) => {
                  if (i.id === roleId) return i.name;
                })}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    props.fetchAllUser("All");
  }, []);

  useEffect(() => {
    let listUser = props.users.map((i) => {
      return {
        id: i.id,
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        phoneNumber: i.phoneNumber,
        address: i.address,
        // image: i.image,
        // positionId: i.positionId,
        roleId: i.roleId,
        // gender: i.gender,
      };
    });
    setUsers(listUser);
    setListSeach(listUser);
  }, [props.users]);
  useEffect(() => {
    let data = users;
    let dataSearch = data.filter((e) => {
      return e.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setListSeach(dataSearch);
  }, [searchTerm]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddUser = () => {
    setOpenModal(!openModal);
    // setUserEdit({});
    setIsAdd(true);
  };
  const handleEditUser = (user) => {
    setUserEdit(user);
    setIsAdd(false);
    setOpenModal(!openModal);
  };
  const handleDeleteUser = (user) => {
    setUserDelete(user);
    setIsOpenConfirmModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setIsOpenConfirmModal(false);
  };
  const deleteUser = () => {
    alert("deleteuser");
    setUserDelete({});
  };
  const handleCellDoubleClick = (params) => {
    console.log("🚀 ~ file: TableManageUser.js:163 ~ handleOnCellClick ~ params", params)
  };
  return (
    <>
      <Box m="20px">
        <Header title="Manage Users" subtitle="Managing the User Members" />
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
          <DataGrid rows={users} columns={columns} onCellDoubleClick={handleCellDoubleClick}/>
        </Box>
      </Box>
      {/* <ModalInfo
        openModal={openModal}
        closeModal={closeModal}
        userEdit={userEdit}
        isAddNewUser={isAdd}
      />
      <ConfirmModal
        openModal={isOpenConfirmModal}
        closeModal={closeModal}
        idDelete={userDelete ? userDelete.id : ""}
        content={userDelete.firstName + " " + userDelete.lastName}
        handleConfirm={deleteUser}
      /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser: (type) => dispatch(actions.fetchAllUserStart(type)),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
