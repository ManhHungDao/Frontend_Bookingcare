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
  Button,
  FormHelperText,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
const tomorrow = dayjs().add(1, "day");

const ManageUserSchedule = ({
  listUser,
  getAllUserAction,
  allcodes,
  fetchAllcode,
  isSuccess,
  clearStatus,
  upsertSchedule,
  getSingleUserSchedule,
  userSchedule,
  deleteSchedule,
}) => {
  const [image, setImage] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");

  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(
    dayjs(new Date(tomorrow).setHours(0, 0, 0)).format("D MMMM YYYY")
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userEdit, setUserEdit] = useState("");
  const [userDelete, setUserDelete] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [errors, setErrors] = useState({});
  const [timeSchedule, setTimeSchedule] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
    fetchAllcode();
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      setPayment("");
      setPrice("");
      setUserEdit("");
      setImage("");
      setClinic("");
      setSpecialty("");
      setName("");
      setPosition("");
      setNote("");
      setDate(
        dayjs(new Date(tomorrow).setHours(0, 0, 0)).format("D MMMM YYYY")
      );
      setTimeSchedule(timeSchedule.map((item) => ({ ...item, active: false })));
      setUserDelete("");
      setOpen(false);
    }
    clearStatus();
  }, [isSuccess]);
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
        allcodes.map((e) => ({
          id: e._id,
          name: e.valueVI,
          type: e.type,
        }))
      );
      setTimeSchedule(
        allcodes
          .filter((e) => e.type === "TIME")
          .map((e) => ({
            id: e._id,
            name: e.valueVI,
            active: false,
          }))
      );
    }
  }, [listUser, allcodes]);
  useEffect(() => {
    // set data when click eidt user in table
    setErrors({});
    setTimeSchedule(
      timeSchedule.map((item) => {
        item.active = false;
        return item;
      })
    );
    if (!_.isEmpty(userEdit)) {
      const { detail, image, name, _id } = userEdit;
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

      getSingleUserSchedule(_id, dayjs(date).unix());
    }
  }, [userEdit]);

  useEffect(() => {
    if (!_.isEmpty(userEdit)) {
      setTimeSchedule(
        timeSchedule.map((item) => {
          item.active = false;
          return item;
        })
      );
      getSingleUserSchedule(userEdit._id, dayjs(date).unix());
    }
  }, [date]);

  useEffect(() => {
    const { detail, schedule, date } = userSchedule;
    if (!_.isEmpty(userSchedule)) {
      if (userSchedule?.packet?.id !== null) return;
      setNote(detail?.note ? detail.note : note);
      setPayment({
        value: detail?.payment?.id ? detail.payment.id : payment.value,
        label: detail?.payment?.name ? detail.payment.name : payment.label,
      });
      setPrice({
        value: detail?.price?.id ? detail.price.id : price.value,
        label: detail?.price?.name ? detail.price.name : price.label,
      });
      if (schedule && schedule.length > 0) {
        let list = timeSchedule.map((e) => {
          schedule.map((item) => {
            if (item.time === e.id) {
              e.active = true;
            }
            return e;
          });
          return e;
        });
        setTimeSchedule(list);
      }
    }
  }, [userSchedule]);

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
  const handleDeleteSchedule = () => {
    if (!_.isEmpty(userDelete) && !_.isEmpty(userDelete._id))
      deleteSchedule(userDelete._id, dayjs(date).unix());
  };
  const handelClickDelete = (user) => {
    setOpen(true);
    setUserDelete(user);
  };
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
    // if (!note) errors.note = "Ghi chú không được bỏ trống";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
    let activeTime = timeSchedule.filter((e) => e.active === true);
    if (activeTime.length <= 0) errors.time = "Chưa chọn thời gian khám";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  const handleClickTime = (e) => {
    let copy = timeSchedule;
    copy = copy.map((item) => {
      if (item.id === e.id) {
        item.active = !item.active;
      }
      return item;
    });
    setTimeSchedule(copy);
  };
  const handleSave = () => {
    if (_.isEmpty(userEdit)) {
      toast.error("Chưa chọn bác sĩ");
      return;
    }
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let listTime = timeSchedule
      .filter((e) => e.active === true)
      .map((e) => ({ time: e.id }));
    let { id, detail } = userEdit;
    let priceUpdate,
      paymentUpdate = "";

    if (price && payment) {
      priceUpdate = {
        id: price.value ? price.value : null,
        name: price.label ? price.label : null,
      };
      paymentUpdate = {
        id: payment.value ? payment.value : null,
        name: payment.label ? payment.label : null,
      };
    } else {
      priceUpdate = detail.price;
      paymentUpdate = detail.payment;
    }

    const data = {
      doctor: {
        id: userEdit.id,
        name: userEdit.name,
      },
      packet: {
        id: null,
        name: null,
      },
      detail: {
        price: priceUpdate,
        payment: paymentUpdate,

        note: note,
      },
      schedule: [...listTime],
      date: dayjs(date).unix(),
    };
    upsertSchedule(data);
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
    const { detail, name, image } = props;
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
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => setUserEdit(props)}>
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
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header title="Thêm lịch khám bệnh" />
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
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
                    minDate={tomorrow}
                    displayStaticWrapperAs="desktop"
                    value={date}
                    onChange={(newValue) => {
                      setDate(dayjs(new Date(newValue).setHours(0, 0, 0)));
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
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  error={errors.note ? true : false}
                  helperText={errors.note}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(100px, 1fr))",
                        gap: 1,
                      }}
                    >
                      {timeSchedule &&
                        timeSchedule.length > 0 &&
                        timeSchedule.map((e) => (
                          <Button
                            key={e.id}
                            variant={
                              e.active === true ? "contained" : "outlined"
                            }
                            // color={errors?.time ? "error" : "primary"}
                            onClick={() => handleClickTime(e)}
                          >
                            {e.name}
                          </Button>
                        ))}
                    </Box>
                    <FormHelperText error={errors?.time ? true : false}>
                      {errors?.time}
                    </FormHelperText>
                  </CardContent>
                </Card>
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
                count={parseInt(listUser?.count ? listUser.count : 0)}
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
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Xóa lịch khám bệnh"
        content={`${userDelete?.name ? userDelete.name : ""}`}
        type="DELETE"
        confirmFunc={handleDeleteSchedule}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.admin.user,
    listUser: state.admin.users,
    allcodes: state.admin.allcodes,
    userSchedule: state.admin.schedule,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    deleteSchedule: (id, date) =>
      dispatch(actions.deleteScheduleAction(id, date)),
    getAllUserAction: (data) => dispatch(actions.getAllUserAction(data)),
    upsertSchedule: (data) => dispatch(actions.upsertScheduleAction(data)),
    getSingleUserSchedule: (id, date) =>
      dispatch(actions.getSingleUserScheduleAction(id, date)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUserSchedule);
