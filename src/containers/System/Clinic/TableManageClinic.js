import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import _ from "lodash";
import DetailClinic from "./DetailClinic";
import "./style.scss";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
const TableManageClinic = ({
  getListClinicAction,
  listClinic,
  isSuccess,
  clearStatus,
}) => {
  const [list, setList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [clinicEdit, setClinicEdit] = useState({});

  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    if (listClinic) {
      let data = listClinic.map((e) => {
        return {
          id: e._id,
          logo: e.logo.url,
          image: e.image.url,
          name: e.name,
          address: e.address,
          introduce: e.introduce,
          detail: e.detail,
          views: e.views,
        };
      });
      setList(data);
    }
    if (isSuccess) {
      setOpen(false);
      clearStatus();
    }
  }, [listClinic, isSuccess]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickView = (data) => {
    setClinicEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (id) => {
    console.log("🚀 ~ click delete:", id);
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <TableCell>Cơ sở</TableCell>
      <TableCell>Địa chỉ</TableCell>
      <TableCell>Lượt truy cập</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, address, name, logo, views } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img className="table__clinic--logo" src={logo} alt={name} />
              </div>
              <div> {name}</div>
            </span>
          </TableCell>
          <TableCell>{address?.detail ? address.detail : ""}</TableCell>
          <TableCell>{views ? views : 0}</TableCell>
          <TableCell>
            <Tooltip title="Xem">
              <IconButton onClick={() => handleClickView(props)}>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handelClickDelete(id)}>
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
          link="/admin/add-clinic"
          activeMenu="Thêm Phòng Khám"
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
                {list &&
                  list.length > 0 &&
                  list.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table__clinic--pagination"
          />
        </Box>
      </Box>
      {clinicEdit && (
        <DetailClinic setOpen={setOpen} open={open} clinic={clinicEdit} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinic,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
