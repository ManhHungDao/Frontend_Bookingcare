import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import validator from "validator";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
  CardContent,
  Typography,
  Divider,
  CardMedia,
  TextField,
  Radio,
} from "@mui/material";
import * as actions from "../../../../store/actions";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import ButtonComponent from "../../../../components/ButtonComponent";
import _ from "lodash";
import InputSelect from "../../../../components/Input/InputSelect";
import AutocompleteAddress from "../../../../components/Input/AutocompleteAddress";
import useIsMobile from "../../../../components/useScreen/useIsMobile";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import localization from "moment/locale/vi";
import moment from "moment";
const CONST_GENDER = [
  { id: "M", name: "Nam" },
  { id: "F", name: "Nữ" },
];
const BookingModal = ({
  open,
  setOpen,
  codeTime,
  dataBooking,
  createUserBookingSchedule,
  isSuccess,
  clearStatus,
  setOpenConfirm,
  sentMail,
}) => {
  const mobiScreen = useIsMobile();
  const [date, setDate] = useState(dayjs(new Date()));
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    detail: "",
    province: "",
  });
  const [gender, setGender] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});
  const style = {
    position: "absolute",
    width: mobiScreen ? "90%" : "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "80vh",
    maxHeight: "80vh",
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: 0,
    right: 0,
  };
  const checkValidate = () => {
    let errors = {};
    if (!email) errors.email = "Email không được bỏ trống";
    if (!validator.isEmail(email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!gender) errors.gender = "Chưa chọn giới tính";
    if (!address.detail) errors.address = "Địa chỉ không được bỏ trống";
    if (!phone) errors.phone = "Số điện thoại không được bỏ trống";
    if (!validator.isMobilePhone(phone))
      errors.phone = "Số điện thoại không hợp lệ";
    if (!reason) errors.reason = "Mô tả không được bỏ trống";
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
    const data = {
      doctorId: dataBooking.doctorId,
      packetId: dataBooking.packetId,
      time: dataBooking.timeBooking,
      date: dataBooking.dateBooking,
      patient: {
        date: dayjs(date).format("YYYY-MM-DD"),
        name,
        email,
        gender: gender.value,
        phone,
        reason,
        address: address.detail,
      },
    };
    createUserBookingSchedule(data);
  };

  const confirmEmail = `
  <h2 style="text-align:center;"><strong>XÁC NHẬN ĐẶT LỊCH KHÁM</strong></h2><p>Xin chào ${name},</p>
  <p>Cảm ơn bạn đã sử dụng dịch vụ tại website chúng tôi, để xác nhận đặt lịch khám bạn vui lòng chọn <a href="http://localhost:3000/confirm-booking?date=${dataBooking.dateBooking}&time=${dataBooking.timeBooking}&doctorId=${dataBooking.doctorId}&packetId=${dataBooking.packetId}&email=${email}">Xác Nhận</a> để xác nhận lịch khám.</p>
  <p>Nếu bạn muốn thay đổi lịch khám, có thể hủy lịch khám bằng cách liên hệ trực tiếp cho quản trị viên hoặc chọn <a href="http://localhost:3000/confirm-booking?date=${
    dataBooking.dateBooking
  }&time=${dataBooking.timeBooking}&doctorId=${dataBooking.doctorId}&packetId=${
    dataBooking.packetId
  }&email=${email}&cancel=${true}">Hủy Lịch</a> để xác nhận hủy lịch khám.</p>
  <p>Xin cảm ơn.</p>
  <p>&nbsp;</p>`;
  // to, subject, html
  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        const mail = {
          to: email,
          subject: "Xác nhận đặt lịch khám",
          html: confirmEmail,
        };
        sentMail(mail);
        // sent email confirm to patient
        setErrors("");
        setEmail("");
        setPhone("");
        setName("");
        setAddress({
          detail: "",
          province: "",
        });
        setGender("");
        setReason("");
        setDate(dayjs(new Date()));
        setOpen(false);
        setOpenConfirm(true);
      }
      clearStatus();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setErrors("");
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "50%",
                  width: 100,
                  height: 100,
                  display: { xs: "none", sm: "block" },
                }}
                image={dataBooking.imgData}
                alt={dataBooking.nameData}
              />
              <CardContent sx={{ maxWidth: 500 }}>
                <Typography variant="subtitle1" color="primary">
                  ĐẶT LỊCH KHÁM
                </Typography>
                <Typography component="h2" variant="h5">
                  {dataBooking.nameData || ""}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {codeTime &&
                    codeTime.length > 0 &&
                    codeTime.map((i) => {
                      if (i.id === dataBooking.timeBooking) return i.name;
                    })}
                  &nbsp; - &nbsp;
                  {moment
                    .unix(dataBooking.dateBooking)
                    .format("dddd - DD/MM/YYYY")}
                </Typography>
              </CardContent>
            </Stack>
            <Divider />
          </Box>
          <Box
            pt={2}
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    error={errors?.email ? true : false}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                    error={errors?.name ? true : false}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Số điện thoại"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone ? true : false}
                    helperText={errors.phone}
                    value={phone}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </Grid>
                <Grid xs={6} md={3}>
                  <InputSelect
                    label="Giới tính"
                    value={gender}
                    onChange={setGender}
                    data={CONST_GENDER}
                    isError={errors?.gender ? true : false}
                    errorText={errors?.gender ? errors.gender : ""}
                    name="Giới tính"
                  />
                </Grid>
                <Grid xs={6} md={3}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="vi"
                  >
                    <DatePicker
                      disableFuture
                      label="Ngày sinh"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={12}>
                  <AutocompleteAddress
                    isErr={errors?.address ? true : false}
                    errName={errors?.address ? errors?.address : ""}
                    setAddress={setAddress}
                    address={address}
                  />
                </Grid>
                <Grid xs={12} md={12}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Lý do khám - biểu hiện"
                    multiline
                    maxRows={20}
                    fullWidth
                    onChange={(e) => setReason(e.target.value)}
                    error={errors?.reason ? true : false}
                    helperText={errors?.reason}
                    value={reason}
                  />
                </Grid>
                <Grid xs={12} md={12}>
                  <Typography variant="subtitle1" color="primary">
                    Hình thức thanh toán
                  </Typography>
                  <Radio checked={true} />
                  Thanh toán sau tại cơ sở y tế
                </Grid>
                <Grid xs={12} md={12} pt={0}>
                  <Box
                    sx={{
                      backgroundColor: "#f8f8f8",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <Stack
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                      direction={"row"}
                    >
                      <Typography variant="subtitle2" p={1}>
                        Giá khám
                      </Typography>
                      <Typography variant="subtitle2" p={1}>
                        {dataBooking.priceDoctor}
                      </Typography>
                    </Stack>
                    <Stack
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                      direction={"row"}
                    >
                      <Typography variant="subtitle2" p={1}>
                        Phí đặt lịch
                      </Typography>
                      <Typography variant="subtitle2" p={1}>
                        Miễn phí
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                      direction={"row"}
                    >
                      <Typography variant="subtitle2" p={1}>
                        Tổng cộng
                      </Typography>
                      <Typography variant="subtitle2" color={"error"} p={1}>
                        {dataBooking.priceDoctor}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box
                    p={1}
                    sx={{ backgroundColor: "#D4EFFC", borderRadius: "4px" }}
                  >
                    <Typography variant="caption">
                      <b>LƯU Ý</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám
                      bệnh, khi điền thông tin anh/chị vui lòng:
                    </Typography>
                    <Typography variant="subtitle2">
                      <FiberManualRecordIcon sx={{ fontSize: "8px" }} />
                      &nbsp; Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên,
                      ví dụ:
                      <b>&nbsp;Trần Văn Phú</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <FiberManualRecordIcon sx={{ fontSize: "8px" }} />
                      &nbsp; Điền đầy đủ, đúng và vui lòng kiểm tra lại thông
                      tin trước khi ấn "Xác nhận"
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                <ButtonComponent
                  content="Xác nhận"
                  handleClick={handleSave}
                  bgcolor="#2196f3"
                  color="#37474f"
                  hoverBgColor="#4dabf5"
                  hoverColor="#fff"
                />
              </Grid>
            </Container>
          </Box>
        </Box>
      </Modal>
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
    createUserBookingSchedule: (data) =>
      dispatch(actions.createUserBookingScheduleAction(data)),
    sentMail: (data) => dispatch(actions.sentMailConfirmAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
