import React, { Component, useState, lazy } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ConfirmModal from "../../../components/ConfirmModal";
import ModalAddEditClinic from "./ModalAddEditClinic";
import ModalManageDetailClinic from "./ModalManageDetailClinic";
const columns = [
  {
    id: "name",
    label: <FormattedMessage id="admin.manage-clinic.name" />,
    flex: 1,
  },
  {
    id: "address",
    label: <FormattedMessage id="admin.manage-clinic.address" />,
    flex: 1,
  },
  {
    id: "editDetail",
    label: <FormattedMessage id="admin.manage-clinic.edit" />,
    flex: 1,
  },
  {
    id: "action",
    label: <FormattedMessage id="manage-user.action" />,
    width: 150,
  },
];

const TableManageClinic = (props) => {
  const [listClinic, setListClinic] = useState([]);
  const [listClinicSearCh, setListClinicSearCh] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [editDetail, setEditDetail] = useState("");
  const [openModalDetail, setOpenModalDetail] = useState(false);

  useEffect(() => {
    props.getListClinicHome();
  }, []);

  useEffect(() => {
    setListClinic(props.listClinic);
    setListClinicSearCh(props.listClinic);
  }, [props.listClinic]);
  useEffect(() => {
    let data = listClinic;
    let dataSearch = data.filter((e) => {
      return e.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setListClinicSearCh(dataSearch);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
  const closeModalDetail = () => {
    setEditDetail("");
    setOpenModalDetail(false);
  };
  const deleteData = () => {
    alert("delete data");
    setDataDelete({});
  };
  const handleEditDetail = (data) => {
    setEditDetail(data);
    setOpenModalDetail(true);
  };
  return (
    <>
      <div className="container">
        <div className="title">
          <FormattedMessage id="admin.manage-clinic.title" />
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
                  {listClinicSearCh
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
                                {column.id === "editDetail" ? (
                                  <span
                                    className="editDetail"
                                    onClick={() => handleEditDetail(row)}
                                  >
                                    <FormattedMessage id="admin.manage-clinic.editDetail" />
                                  </span>
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
              count={listClinicSearCh.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
      <ModalAddEditClinic
        openModal={openModal}
        closeModal={closeModal}
        dataEdit={dataEdit}
        isAddNewUser={isAdd}
      />
      <ConfirmModal
        openModal={isOpenConfirmModal}
        closeModal={closeModal}
        idDelete={dataDelete ? dataDelete.id : ""}
        content={dataDelete.name}
        handleConfirm={deleteData}
      />
      {editDetail && (
        <ModalManageDetailClinic
          id={editDetail ? editDetail.id : ""}
          name={editDetail ? editDetail.name : ""}
          openModal={openModalDetail}
          closeModal={closeModalDetail}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    // deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
