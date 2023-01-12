import React, { Component, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../store/actions";
import { useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
// import ModalInfo from "./ModalInfo";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ConfirmModal from "../ConfirmModal";

const TableManageUser = ({ columns, dataInput }) => {
  const [data, setData] = useState([]);
  const [listSeach, setListSeach] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (dataInput) setData(dataInput);
  }, []);
  //   useEffect(() => {
  //     let temp = data;
  //     let dataSearch = temp.filter((e) => {
  //       return e.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  //     });
  //     setListSeach(dataSearch);
  //   }, [searchTerm]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdd = () => {
    setOpenModal(!openModal);
    // setDataEdit({});
    setIsAdd(true);
  };
  const handleEdit = (user) => {
    setDataEdit(user);
    setIsAdd(false);
    setOpenModal(!openModal);
  };
  const handleDelete = (user) => {
    setDataDelete(user);
    setIsOpenConfirmModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setIsOpenConfirmModal(false);
  };
  const deleteData = () => {
    alert("delete data");
    setDataDelete({});
  };
  return (
    <>
      <div className="container">
        <div className="title">
          <FormattedMessage id="menu.admin.crud-redux" />
        </div>
        <div className="row">
          <div className="col-12 d-lg-flex align-items-lg-center justify-content-end gap-5 mb-2">
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
              onClick={handleAdd}
              style={{ height: "fit-content" }}
            >
              <FormattedMessage id="manage-user.add" />
            </Button>
          </div>
          <div className="col-12 p-0 ">
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
                                {column.id === "action" ? (
                                  <>
                                    <button
                                      className="btn btn-edit"
                                      onClick={() => {
                                        handleEdit(row);
                                      }}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-delete"
                                      onClick={() => {
                                        handleDelete(row);
                                      }}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </>
                                ) : (
                                  ""
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
          </div>
        </div>
      </div>
      {/* <ModalInfo
        openModal={openModal}
        closeModal={closeModal}
        dataEdit={dataEdit}
        isAddNewUser={isAdd}
      /> */}
      <ConfirmModal
        openModal={isOpenConfirmModal}
        closeModal={closeModal}
        idDelete={dataDelete ? dataDelete.id : ""}
        // content={dataDelete.firstName + " " + dataDelete.lastName}
        content="test data"
        handleConfirm={deleteData}
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
