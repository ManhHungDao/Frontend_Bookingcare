import React, { Component, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ModalInfo from "./ModalInfo";

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: <FormattedMessage id="manage-user.email" />,
    flex: 1,
    // type: "email",
    // width: 90,
  },
  {
    field: "firstName",
    headerName: <FormattedMessage id="manage-user.firstName" />,
    sortable: false,
    flex: 1,
    // width: 130,
  },
  {
    field: "lastName",
    headerName: <FormattedMessage id="manage-user.lastName" />,
    flex: 1,
    // width: 130,
  },
  {
    field: "phoneNumber",
    headerName: <FormattedMessage id="manage-user.phone-number" />,
    // width: 130,
    sortable: false,
    flex: 1,
  },
  {
    field: "address",
    headerName: <FormattedMessage id="manage-user.address" />,
    // width: 130,
    sortable: false,
    flex: 1,
  },
  /* {
    field: "action",
    headerName: <FormattedMessage id="manage-user.action" />,
    width: 150,
    sortable: false,
    renderCell: () => (
      <strong>
        <button
          className="btn btn-edit"
          onClick={() => {
            // this.handleEditUser(item);
          }}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          className="btn btn-delete"
          onClick={() => {
            // this.handleDeleteUser(item.id);
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </strong>
    ),
  }, */
];

const TableManageUser = (props) => {
  const [users, setUsers] = useState([]);
  const [listSeach, setListSeach] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [idEdit, setIdEdit] = useState("");
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
  /*   const handleDeleteUser = (id) => {
    this.props.deleteUser(id);
  };
  const handleEditUser = (userData) => {
    this.props.handleEditUser(userData);
  }; */
  const handleOpenCloseModal = () => {
    setOpenModal(!openModal);
  };
  const handleOnCellClick = (params) => {
    console.log(
      "🚀 ~ file: TableManageUser.js:122 ~ handleOnCellClick ~ params",
      params.id
    );
  };
  const handleEdit = (params) => {
    setOpenModal(!openModal);
    setIdEdit(params.id);
  };
  return (
    <>
      <div className="container">
        <div className="title">
          <FormattedMessage id="menu.admin.crud-redux" />
        </div>
        <div className="row">
          <div className="col-12 d-lg-flex align-content-center justify-content-end gap-5 mb-2">
            {/* <div className="col-sm-12 col-lg-6"> */}
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
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={handleOpenCloseModal}
                style={{ height: "fit-content", marginRight: "5px" }}
              >
                <FormattedMessage id="manage-user.save" />
              </Button>
              <Button
                variant="contained"
                color="error"
                // onClick={handleOpenCloseModal}
                style={{ height: "fit-content" }}
              >
                <FormattedMessage id="manage-user.delete" />
              </Button>
            </div>
          </div>
          <div className="col-12 p-0 ">
            <div style={{ height: 700, width: "100%" }}>
              <DataGrid
                rows={listSeach}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                onCellClick={handleOnCellClick}
                onCellDoubleClick={handleEdit}
                // checkboxSelection
              />
            </div>
          </div>
        </div>
      </div>
      <ModalInfo
        openModal={openModal}
        handleOpenCloseModal={handleOpenCloseModal}
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
