import React, { useState } from "react";
import Header from "../../../../components/Header";
import {
  Box,
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
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import ButtonComponent from "../../../../components/ButtonComponent";

const FormData = ({
  data,
  type,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  clearState,
  title,
}) => {
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  //   const [type, setType] = useState("SPECIALTY");
  const [keyMap, setKeyMap] = useState("");
  const [errors, setErrors] = useState({});
  const hadnleClickView = (props) => {};
  const handelClickDelete = (props) => {};
  //   const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const [page, setPage] = useState(0);
  const handleSave = () => {};
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <TableCell>Khóa</TableCell>
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
    );
  };
  return (
    <>
      <Typography variant="h3">{title}</Typography>
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
                onChange={(e) => setNameVi(e.target.value)}
                error={errors.nameVi}
                helperText={errors.nameVi}
                value={nameVi}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="outlined-required"
                label="Tên tiếng anh"
                fullWidth
                onChange={(e) => setNameEn(e.target.value)}
                error={errors.nameEn}
                helperText={errors.nameEn}
                value={nameEn}
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
              //   className="table__user--pagination"
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
    </>
  );
};

export default FormData;
