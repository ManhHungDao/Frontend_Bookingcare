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
  image,
  nameDcctor,
  timeBooking,
  codeTime,
  dateBooking,
  priceBooking,
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
      name,
      email,
      gender: gender.value,
      phone,
      reason,
      address: address.detail,
      date: dayjs(date).format("YYYY-MM-DD"),
    };
    console.log("🚀 ~ file: BookingModal.js:98 ~ handleSave ~ data:", data);
  };
  const handleClose = () => {
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
                image={image}
                alt={"dasdsa"}
              />
              <CardContent>
                <Typography variant="subtitle1" color="primary">
                  ĐẶT LỊCH KHÁM
                </Typography>
                <Typography component="h2" variant="h5">
                  {nameDcctor}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {codeTime &&
                    codeTime.length > 0 &&
                    codeTime.map((i) => {
                      if (i.id === timeBooking) return i.name;
                    })}
                  &nbsp; - &nbsp;
                  {moment.unix(dateBooking).format("dddd - DD/MM/YYYY")}
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
                        {priceBooking}
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
                        {priceBooking}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
