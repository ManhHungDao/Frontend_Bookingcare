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
} from "@mui/material";
import _ from "lodash";
import Header from "../../../components/Header";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DetailSpecialty from "./DetailSpecialty";

const TableManageSpecialty = ({
  getAllSpecialtyAction,
  listSpecialty,
  deleteSpecialtyAction,
  isSuccess,
  clearStatus,
}) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [specialtyEdit, setSpecialtyEdit] = useState({});
  const [specialtyDelete, setSpecialtyDelete] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllSpecialtyAction();
  }, []);

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
          title="Quản lý danh sách phòng khám"
          subtitle="Quản lý phòng khám"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-specialty"
          activeMenu="Thêm Chuyên Khoa"
        />
        <Box m="40px 0 0 0" height="75vh">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtyAction: () => dispatch(actions.getAllSpecialtyAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    deleteSpecialtyAction: (id) => dispatch(actions.deleteSpecialtyAction(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
