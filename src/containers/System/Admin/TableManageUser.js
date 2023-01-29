import React, { Component, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ModalInfo from "./ModalInfo";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ConfirmModal from "../../../components/ConfirmModal";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../../components/Header.jsx";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../theme";

const role = [
  { id: "R1", name: "admin" },
  { id: "R2", name: "doctor" },
  { id: "R3", name: "users" },
];

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

  const columns = [
    {
      id: "email",
      label: <FormattedMessage id="manage-user.email" />,
      flex: 1,
    },
    {
      id: "firstName",
      label: <FormattedMessage id="manage-user.firstName" />,
      flex: 1,
    },
    {
      id: "lastName",
      label: <FormattedMessage id="manage-user.lastName" />,
      flex: 1,
    },
    {
      id: "phoneNumber",
      label: <FormattedMessage id="manage-user.phone-number" />,
      flex: 1,
    },
    {
      id: "address",
      label: <FormattedMessage id="manage-user.address" />,
      flex: 1,
    },
    {
      id: "roleId",
      label: "Access Level",
      flex: 1,
    },
    {
      id: "action",
      label: <FormattedMessage id="manage-user.action" />,
      width: 150,
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
        image: i.image,
        positionId: i.positionId,
        roleId: i.roleId,
        gender: i.gender,
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
  return (
    <>
      <Box m="20px">
        <Header title="Manage Users" subtitle="Managing the User Members" />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Box display="flex">
            <TextField
              id="input-with-icon-textfield"
              label={<FormattedMessage id="manage-user.search" />}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleAddUser}
              style={{ height: "fit-content" }}
            >
              <FormattedMessage id="manage-user.add" />
            </Button>
          </Box>
        </Box>
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
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listSeach
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                              {column.id === "roleId" && (
                                <Box
                                  backgroundColor={colors.greenAccent[600]}
                                  borderRadius="4px"
                                >
                                  <Typography
                                    color={colors.grey[100]}
                                    sx={{ ml: "5px" }}
                                  >
                                    {row[column.id] === "R1" && (
                                      <AdminPanelSettingsOutlinedIcon />
                                    )}
                                    {row[column.id] === "R2" && (
                                      <SecurityOutlinedIcon />
                                    )}
                                    {row[column.id] === "R3" && (
                                      <LockOpenOutlinedIcon />
                                    )}
                                    {role &&
                                      role.map((i) => {
                                        if (i.id === row[column.id])
                                          return i.name;
                                      })}
                                  </Typography>
                                </Box>
                              )}
                              {column.id === "action" && (
                                <>
                                  <button
                                    className="btn btn-edit"
                                    onClick={() => {
                                      handleEditUser(row);
                                    }}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-delete"
                                    onClick={() => {
                                      handleDeleteUser(row);
                                    }}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listSeach.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
      <ModalInfo
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
      />
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
