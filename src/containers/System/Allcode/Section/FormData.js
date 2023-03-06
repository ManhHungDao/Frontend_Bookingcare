import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import _ from "lodash";
const FormData = ({
  data,
  type,
  page,
  setPage,
  clearState,
  title,
  updateAllCodeAction,
  deleteAllCodeAction,
  createAllCodeAction,
  isSuccess,
  clearStatus,
  keyMapConstant,
  lastNum,
  // keyMap,
}) => {
  useEffect(() => {
    if (keyMapConstant && lastNum) {
      const keyMap = keyMapConstant + lastNum;
      setKeyMap(keyMap);
    }
  }, [keyMapConstant, lastNum]);

  const [valueVI, setValueVI] = useState("");
  const [valueEn, setValueEn] = useState("");
  const [keyMap, setKeyMap] = useState("");
  const [editCode, setEditCode] = useState({});
  const [deleteCode, setDeleteCode] = useState({});
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [errors, setErrors] = useState({});

  // const [allcodes, setAllcodes] = useState([]);
  // useEffect(() => {
  //   if (data && data.length > 0 && type)
  //     setAllcodes(data.filter((e) => e.type === type));
  // }, [type, data]);

  const hadnleClickView = (props) => {
    setIsEdit(true);
    setEditCode(props);
    setValueEn(props?.valueEN ? props?.valueEN : "");
    setValueVI(props?.valueVI ? props?.valueVI : "");
    setKeyMap(props?.keyMap ? props?.keyMap : "");
  };
  const handelClickDelete = (props) => {
    setDeleteCode(props);
    setOpenConfirmModal(true);
  };
  const handleDeleteCode = () => {
    const id = deleteCode?._id ? deleteCode?._id : null;
    if (id) deleteAllCodeAction(id);
  };
  const checkUniKeymap = () => {
    return data.filter((e) => e.keyMap === keyMap);
  };
  const handleSave = () => {
    if (!valueEn && !valueVI) {
      toast.error("Tên đang trống");
      return;
    }
    if (!keyMap) {
      toast.error("Mã định danh đang trống");
      return;
    }
    if (_.isEmpty(checkUniKeymap()) === false) {
      toast.error("Mã định danh đã tồn tại");
      return;
    }
    const data = {
      valueEn: valueEn ? valueEn : null,
      valueVI: valueVI ? valueVI : null,
      type: type ? type : null,
      keyMap: keyMap ? keyMap : null,
    };
    if (isEdit === true) {
      // updateAllCodeAction(editCode._id, data);
      console.log("check data sent edit", editCode._id, data);
    } else {
      // createAllCodeAction(data);
      console.log("check data sent add new", data);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickRenew = () => {
    setValueVI("");
    setValueEn("");
    const keyMap = keyMapConstant + lastNum;
    setKeyMap(keyMap);
    setEditCode({});
    setIsEdit(false);
    setErrors({});
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <TableCell>Mã định danh</TableCell>
      <TableCell>Loại</TableCell>
      <TableCell>Tên tiếng anh</TableCell>
      <TableCell>Tên tiếng việt</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, valueEN, valueVI, keyMap, type } = props;
    return (
      <TableRow>
        <TableCell>{keyMap ? keyMap : "-"}</TableCell>
        <TableCell>{type ? type : "-"}</TableCell>
        <TableCell>{valueEN ? valueEN : "-"}</TableCell>
        <TableCell>{valueVI ? valueVI : "-"}</TableCell>
        <TableCell>
          <Tooltip title="Chỉnh sửa">
            <IconButton onClick={() => hadnleClickView(props)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton onClick={() => handelClickDelete(props)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <>
      <Typography variant="h3">
        {title}
        <Tooltip title="Làm mới">
          <IconButton onClick={handleClickRenew}>
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label="Tên tiếng việt"
                fullWidth
                onChange={(e) => setValueVI(e.target.value)}
                value={valueVI}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="outlined-required"
                label="Tên tiếng anh"
                fullWidth
                onChange={(e) => setValueEn(e.target.value)}
                value={valueEn}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-required"
                label="Loại"
                fullWidth
                onChange={(e) => setValueEn(e.target.value)}
                value={type}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-required"
                label="Mã định danh"
                fullWidth
                onChange={(e) => setKeyMap(e.target.value)}
                value={keyMap}
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
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
                  data.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <TablePagination
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              className="table__user--pagination"
            />
          )}
        </Grid>
        <Grid item xs={12} md={12} display="flex" justifyContent="flex-end">
          <ButtonComponent
            content="Lưu"
            handleClick={handleSave}
            bgcolor="#94e2cd"
            color="#141414"
            hoverBgColor="#1e5245"
            hoverColor="#fff"
          />
        </Grid>
      </Grid>
      {deleteCode && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa code"
          content={`${deleteCode?.valueVI ? deleteCode.valueVI : ""}`}
          type="DELETE"
          confirmFunc={handleDeleteCode}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAllCodeAction: (data) => dispatch(actions.createAllCodeAction(data)),
    updateAllCodeAction: (id, data) =>
      dispatch(actions.updateAllCodeAction(id, data)),
    deleteAllCodeAction: (id) => dispatch(actions.deleteAllCodeAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormData);
