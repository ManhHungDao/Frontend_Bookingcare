import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  OutlinedInput,
  FormControl,
  Grid,
  InputAdornment,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../../components/Header.jsx";
import _ from "lodash";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DetailUser from "./DetailUser";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import Select from "react-select";
import "./Style.scss";

const TableManageUser = (props) => {
  const { userInfo, listClinic, getListClinicHomePatient } = props;
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userDelete, setUserDelete] = useState({});

  const [listSelectClinic, setListSelectClinic] = useState([]);
  const [selectClinic, setSelectClinic] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
    getListClinicHomePatient();
  }, []);

  useEffect(() => {
    if (props.isSuccess !== null) {
      if (props.isSuccess === true) {
        props.getAllUserAction();
        setOpen(false);
      }
      setOpenConfirmModal(false);
      props.clearStatus();
    }
  }, [props.isSuccess]);

  useEffect(() => {
    setListSelectClinic(
      listClinic.map((e) => ({
        value: e._id,
        label: e.name,
      }))
    );
  }, [listClinic]);

  useEffect(() => {
    if (props.users.list && props.users.list.length > 0) {
      setUsers(
        props.users.list.map((i) => {
          return {
            ...i,
            id: i._id,
            image: i.image.url,
          };
        })
      );
    } else {
      setUsers([]);
    }
  }, [props.users]);

  useEffect(() => {
    if (selectClinic === "") return;
    setSearch("");
    const clinicId = selectClinic.value;
    fetchDataAPI(1, rowsPerPage, clinicId, "");
  }, [selectClinic]);

  useEffect(() => {
    const clinicId = selectClinic.value;
    const filter = search;
    fetchDataAPI(page, rowsPerPage, clinicId, filter);
  }, [page, rowsPerPage]);

  const fetchDataAPI = (page, size, clinicId = "", filter = "") => {
    const data = {
      page,
      size,
      clinicId,
      filter,
    };
    props.getAllUserAction(data);
  };

  const handelClickEmpty = () => {
    setSearch("");
    setSelectClinic("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, rowsPerPage, "", "");
  };

  const handleClickSearch = () => {
    setPage(0);
    fetchDataAPI(1, rowsPerPage, "", search);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const hadnleClickView = (data) => {
    setUserEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (user) => {
    setOpenConfirmModal(true);
    setUserDelete(user);
  };
  const handleDeleteUser = () => {
    const id = userDelete.id;
    if (id) props.deleteUserAction(id);
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <TableCell>Người dùng</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Số điện thoại</TableCell>
      <TableCell>Địa chỉ</TableCell>
      <TableCell>Cơ sở</TableCell>
      <TableCell>Vị trí</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
  const handleOnChangeSearch = (e) => {
    setSelectClinic("");
    setSearch(e.target.value);
  };
  const TableColumn = (props) => {
    const { address, name, image, phone, email, roleId, detail } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img className="table__clinic--logo" src={image} alt={name} />
              </div>
              <div> {name}</div>
            </span>
          </TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell>{address?.detail ? address?.detail : ""}</TableCell>
          <TableCell>
            <Typography variant="">
              {detail.clinic.name ? detail.clinic.name : ""}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {detail.position.name ? detail.position.name : ""}
            </Typography>
          </TableCell>
          {userInfo.roleId === "R2" ? (
            <TableCell>
              <Tooltip title="Xem">
                <IconButton onClick={() => hadnleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : (
            <TableCell>
              <Tooltip title="Xem">
                <IconButton onClick={() => hadnleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
              {roleId !== "R0" && roleId !== userInfo.roleId && (
                <Tooltip title="Xóa">
                  <IconButton onClick={() => handelClickDelete(props)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          )}
        </TableRow>
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header
          title="Danh sách người dùng"
          subtitle="Quản lý thành viên"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-user"
          activeMenu="Thêm Người Dùng"
        />
        <Box m="20px 0 0 0" height="75vh">
          <Box m="0 0 7px 0">
            <Grid container spacing={2}>
              <Grid item sm={6} md={3}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    placeholder="Lọc theo tên"
                    id="outlined-adornment-weight"
                    value={search}
                    onChange={(e) => handleOnChangeSearch(e)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} md={3}>
                <Select
                  className={`react-select-container`}
                  value={selectClinic}
                  onChange={(e) => setSelectClinic(e)}
                  options={listSelectClinic}
                  placeholder="Lọc theo bệnh viện"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
              </Grid>
              <Grid item sm={6} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton onClick={() => handelClickEmpty()}>
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRowName />
              </TableHead>
              <TableBody>
                {users &&
                  users.length > 0 &&
                  users.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {users && (
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              component="div"
              count={props.users.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Box>
      </Box>
      {userEdit && <DetailUser open={open} setOpen={setOpen} user={userEdit} />}
      {userDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa người dùng"
          content={`${userDelete?.name ? userDelete.name : ""}`}
          type="DELETE"
          confirmFunc={handleDeleteUser}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    isSuccess: state.app.isSuccess,
    userInfo: state.user.userInfo,
    listClinic: state.patient.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserAction: (data) => dispatch(actions.getAllUserAction(data)),
    deleteUserAction: (id) => dispatch(actions.deleteUserAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
    getListClinicHomePatient: () =>
      dispatch(actions.getListClinicHomePatientAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
