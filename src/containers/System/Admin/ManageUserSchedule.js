import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
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
  FormControl,
  InputAdornment,
  Paper,
} from "@mui/material";
import _ from "lodash";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import InputSelect from "../../../components/Input/InputSelect";
import ButtonComponent from "../../../components/ButtonComponent";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";

const ManageUserSchedule = ({
  listUser,
  getAllUserAction,
  allcodes,
  fetchAllcode,
}) => {
  const [image, setImage] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [users, setUsers] = useState([]);
  const [note, setNote] = useState("");

  const [date, setDate] = useState(dayjs(new Date()));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userEdit, setUserEdit] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
    fetchAllcode();
  }, []);

  useEffect(() => {
    if (listUser.list && listUser.list.length > 0) {
      setUsers(
        listUser.list.map((i) => {
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
    if (allcodes && allcodes.length > 0) {
      setDataSelect(
        allcodes.map((e) => ({ id: e._id, name: e.valueVI, type: e.type }))
      );
    }
  }, [listUser, allcodes]);
  useEffect(() => {
    setErrors({});
    if (!_.isEmpty(userEdit)) {
      const { detail, image, name } = userEdit;
      setImage(image ? image : "");
      setClinic(detail?.clinic?.name ? detail.clinic.name : "");
      setSpecialty(detail?.specialty?.name ? detail.specialty.name : "");
      setPosition(detail?.position?.name ? detail.position.name : "");
      setPayment({
        value: detail?.payment?.id ? detail.payment.id : "",
        label: detail?.payment?.name ? detail.payment.name : "",
      });
      setPrice({
        value: detail?.price?.id ? detail.price.id : "",
        label: detail?.price?.name ? detail.price.name : "",
      });
      setName(name ? name : "");
      setNote(detail?.note ? detail.note : "");
    }
  }, [userEdit]);

  const fetchDataAPI = (page, size, clinicId = "", filter = "") => {
    const data = {
      page,
      size,
      clinicId,
      filter,
    };
    getAllUserAction(data);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage + 1, rowsPerPage, "", search);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchDataAPI(page + 1, +event.target.value, "", search);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      minWidth: 170,
    },
  }));
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleEnterSearch = (e) => {
    if (e.which === 13) {
      handleClickSearch();
    }
  };
  const handleClickSearch = () => {
    setPage(0);
    fetchDataAPI(1, rowsPerPage, "", search);
  };
  const handelClickEmpty = () => {
    setSearch("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10, "", "");
  };

  const checkValidate = () => {
    let errors = {};
    if (!note) errors.note = "Ghi chú không được bỏ trống";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  const handleSave = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Bác sĩ</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Chuyên khoa</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { _id, detail, name, image } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img
                  className="table__clinic--logo"
                  src={image ? image : ""}
                  alt={name ? name : ""}
                />
              </div>
              <div> {name ? name : ""}</div>
            </span>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {detail?.clinic?.name ? detail.clinic.name : ""}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {detail?.specialty?.name ? detail.specialty.name : ""}
            </Typography>
          </TableCell>
          <TableCell>
            <Tooltip title="Xem">
              <IconButton onClick={() => setUserEdit(props)}>
                <EditIcon />
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
        <Header title="Quản lý lịch khám bệnh" />
        <Grid container spacing={2}>
          <Grid
            item
            display="flex"
            alignItems="center"
            sx={{ boder: "1px solid red" }}
            md={6}
            xs={12}
          >
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} sx={{ height: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <UpLoadAvatar
                            isDetail={true}
                            preWidth="80px"
                            preHeight="80px"
                            image={image}
                            disableEdit={true}
                          />
                          <Typography gutterBottom variant="h5">
                            <Box
                              width="100%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                              backgroundColor="#4cceac"
                              borderRadius="4px"
                            >
                              <Typography
                                color="#141414"
                                sx={{
                                  ml: "5px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {position ? position : ""} -&nbsp;
                                {name ? name : ""}
                              </Typography>
                            </Box>
                          </Typography>
                          <Grid item md={12} xs={12}>
                            <Typography color="text.secondary" variant="body2">
                              <HomeWorkOutlinedIcon />
                              <span className="m-1">
                                {clinic ? clinic : ""} -&nbsp;
                                {specialty ? specialty : ""}
                              </span>
                            </Typography>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InputSelect
                      label="Chọn giá (VNĐ)"
                      value={price}
                      onChange={setPrice}
                      data={dataSelect.filter((e) => e.type === "PRICE")}
                      isError={errors.price ? true : false}
                      errorText={errors.price ? errors.price : ""}
                      name="Chọn giá (VNĐ)"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InputSelect
                      label="Chọn phương thức thanh toán"
                      value={payment}
                      onChange={setPayment}
                      data={dataSelect.filter((e) => e.type === "PAYMENT")}
                      isError={errors.payment ? true : false}
                      errorText={errors.payment ? errors.payment : ""}
                      name="Chọn phương thức thanh toán"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <StaticDatePicker
                    className="day-picker"
                    disablePast
                    displayStaticWrapperAs="desktop"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Ghi chú"
                  multiline
                  maxRows={4}
                  fullWidth
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  error={errors.note ? true : false}
                  helperText={errors.note}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={8} md={5}>
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
              <Grid item xs={4} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton onClick={() => handelClickEmpty()}>
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={12}>
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
                      {users &&
                        users.length > 0 &&
                        users.map((e) => <TableColumn key={e.id} {...e} />)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            {users && (
              <TablePagination
                rowsPerPageOptions={[10, 15, 25]}
                component="div"
                count={listUser.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="table__user--pagination"
              />
            )}
            {/*   bảng chọn người dùng */}
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
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.admin.user,
    listUser: state.admin.users,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    getAllUserAction: (data) => dispatch(actions.getAllUserAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUserSchedule);
