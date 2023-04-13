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
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Header from "../../../components/Header.jsx";
import _ from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import "./Style.scss";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { deleteAccountPatient } from "../../../services/patientService";
import { toast } from "react-toastify";

const TableManageAccountPatient = ({
  getAllAccountPatient,
  data,
  isSuccess,
  clearStatus,
}) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [accountDelete, setUserDelete] = useState({});

  const [search, setSearch] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      minWidth: 170,
    },
  }));

  const fetchDataAPI = (page, size, filter = "") => {
    const data = {
      page,
      size,
      filter,
    };
    getAllAccountPatient(data);
  };

  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
  }, []);

  //   useEffect(() => {
  //     if (isSuccess !== null) {
  //       if (isSuccess === true) {
  //         const searchValue = search ? search : "";
  //         fetchDataAPI(page + 1, rowsPerPage, searchValue);
  //         setOpen(false);
  //         setEnableEdit(false);
  //       }
  //       setOpenConfirmModal(false);
  //       clearStatus();
  //     }
  //   }, [isSuccess]);

  useEffect(() => {
    if (data?.list?.length > 0) {
      setList(data.list);
    } else {
      setList([]);
    }
  }, [data]);

  const handelClickEmpty = () => {
    setSearch("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10);
  };

  const handleClickSearch = () => {
    setPage(0);
    fetchDataAPI(1, rowsPerPage, search);
  };

  const handleEnterSearch = (e) => {
    if (e.which === 13) {
      handleClickSearch();
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage + 1, rowsPerPage, search);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchDataAPI(page + 1, +event.target.value, search);
  };

  const hadnleClickView = (data) => {
    setUserEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (user) => {
    setOpenConfirmModal(true);
    setUserDelete(user);
  };
  const handleDeleteAccount = async () => {
    try {
      const id = accountDelete._id;
      let res = await deleteAccountPatient(id);
      if (res && res.success) {
        fetchDataAPI(page + 1, rowsPerPage, search);
        setOpenConfirmModal(false);
        toast.success("Xóa thành công");
      }
    } catch (error) {
      setOpenConfirmModal(false);
      toast.error("Xóa thất bại");
    }
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Email</StyledTableCell>
      <StyledTableCell>Tên</StyledTableCell>
      <StyledTableCell>Giới tính</StyledTableCell>
      <StyledTableCell>Ngày sinh</StyledTableCell>
      <StyledTableCell>Số điện thoại</StyledTableCell>
      <StyledTableCell>Địa chỉ</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const TableColumn = (props) => {
    const { address, name, phone, email, gender, dateOfBirth } = props;

    return (
      <>
        <TableRow>
          <TableCell>{email}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{gender === "M" ? "Nam" : "Nữ"}</TableCell>
          <TableCell>
            {dayjs(new Date(dateOfBirth)).format("DD/MM/YYYY")}
          </TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell>{address?.detail ? address?.detail : ""}</TableCell>

          <TableCell>
            <Tooltip title="Xem">
              <IconButton onClick={() => hadnleClickView(props)}>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handelClickDelete(props)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header
          title="Danh sách người dùng"
          //   subtitle="Quản lý thành viên"
          //   titleBtn="Thêm mới"
          //   isShowBtn={true}
          //   link="/admin/add-user"
          //   activeMenu="Thêm Người Dùng"
        />
        <Box m="20px 0 0 0">
          <Box m="0 0 7px 0">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    placeholder="Lọc theo tên"
                    id="outlined-adornment-weight"
                    value={search}
                    onChange={(e) => handleOnChangeSearch(e)}
                    onKeyPress={(e) => handleEnterSearch(e)}
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
              <Grid item xs={12} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton onClick={() => handelClickEmpty()}>
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRowName />
              </TableHead>
              <TableBody>
                {list &&
                  list.length > 0 &&
                  list.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              component="div"
              count={parseInt(data?.count ? data.count : 0)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Box>
      </Box>

      {accountDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa người dùng"
          content={`${accountDelete?.name ? accountDelete.name : ""}`}
          type="DELETE"
          confirmFunc={handleDeleteAccount}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.admin.listAccountPatient,
    isSuccess: state.app.isSuccess,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAccountPatient: (data) =>
      dispatch(actions.getAllAccountPatientAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageAccountPatient);
