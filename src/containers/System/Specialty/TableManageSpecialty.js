import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Grid,
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
  OutlinedInput,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import Header from "../../../components/Header";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DetailSpecialty from "./DetailSpecialty";
import InputSelect from "../../../components/Input/InputSelect";

const TableManageSpecialty = ({
  getAllSpecialtyAction,
  listSpecialty,
  deleteSpecialtyAction,
  isSuccess,
  clearStatus,
  listClinic,
  getListClinicHomePatient,
}) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [specialtyEdit, setSpecialtyEdit] = useState({});
  const [specialtyDelete, setSpecialtyDelete] = useState({});
  const [data, setData] = useState([]);

  const [listSelectClinic, setListSelectClinic] = useState([]);
  const [selectClinic, setSelectClinic] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllSpecialtyAction();
    getListClinicHomePatient();
  }, []);

  useEffect(() => {
    setListSelectClinic(
      listClinic.map((e) => ({
        id: e._id,
        name: e.name,
      }))
    );
  }, [listClinic]);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        setOpen(false);
        getAllSpecialtyAction();
        setSpecialtyEdit({});
        setSpecialtyDelete({});
      }
      setOpenConfirmModal(false);
      clearStatus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (listSpecialty && listSpecialty.length > 0) setData(listSpecialty);
  }, [listSpecialty]);

  const handleClickView = (data) => {
    setSpecialtyEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (data) => {
    setOpenConfirmModal(true);
    setSpecialtyDelete(data);
  };
  const handleDeleteClinic = () => {
    if (specialtyDelete) deleteSpecialtyAction(specialtyDelete._id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handelClickEmpty = () => {
    setSearch("");
    setSelectClinic("");
  };

  const handleClickSearch = () => {
    // gọi api tìm kiếm theo tên
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <TableCell>Tên chuyên khoa</TableCell>
      <TableCell>Cơ sở</TableCell>
      <TableCell>Phổ biến</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, clinic, name, image, popular, detail } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img
                  className="table__clinic--logo"
                  src={image?.url ? image.url : ""}
                  alt={name ? name : ""}
                />
              </div>
              <div> {name ? name : ""}</div>
            </span>
          </TableCell>
          <TableCell>{clinic?.name ? clinic.name : "-"}</TableCell>
          <TableCell>{popular ? <CheckCircleOutlineIcon /> : "-"}</TableCell>
          <TableCell>
            <Tooltip title="Xem">
              <IconButton onClick={() => handleClickView(props)}>
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
          title="Quản lý danh sách chuyên khoa"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-specialty"
          activeMenu="Thêm Chuyên Khoa"
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
                    onChange={(e) => setSearch(e.target.value)}
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
                <InputSelect
                  value={selectClinic}
                  onChange={setSelectClinic}
                  data={listSelectClinic}
                  name="Lọc theo bệnh viện"
                  minWidth={200}
                />
              </Grid>
              <Grid item sm={6} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm trống">
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
                {data &&
                  data.length > 0 &&
                  data.map((e, i) => (
                    <React.Fragment key={i}>
                      <TableColumn {...e} />
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table__clinic--pagination"
          />
        </Box>
      </Box>
      {specialtyEdit && (
        <DetailSpecialty
          setOpen={setOpen}
          open={open}
          specialty={specialtyEdit}
        />
      )}
      {specialtyDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa chuyên khoa"
          content={`${specialtyDelete?.name ? specialtyDelete.name : ""} ${
            specialtyDelete?.clinic?.name
              ? `- ${
                  specialtyDelete?.clinic?.name
                    ? specialtyDelete?.clinic?.name
                    : ""
                }`
              : ""
          } `}
          type="DELETE"
          confirmFunc={handleDeleteClinic}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listSpecialty: state.admin.listSpecialty,
    isSuccess: state.app.isSuccess,
    listClinic: state.patient.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtyAction: () => dispatch(actions.getAllSpecialtyAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    deleteSpecialtyAction: (id) => dispatch(actions.deleteSpecialtyAction(id)),
    getListClinicHomePatient: () =>
      dispatch(actions.getListClinicHomePatientAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
