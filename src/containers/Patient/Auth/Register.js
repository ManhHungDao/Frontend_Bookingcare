import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../assets/logo.png";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import {
  FormControl,
  Stepper,
  Step,
  StepButton,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { InputLabel, OutlinedInput, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputSelect from "../../../components/Input/InputSelect";
import StepLabel from "@mui/material/StepLabel";
import successImg from "../../../assets/verified.png";
import validator from "validator";
import { toast } from "react-toastify";
import { emailRegister } from "../../../data/emailRegister";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      HealthCare-
      {new Date().getFullYear()}
    </Typography>
  );
}
const CONST_GENDER = [
  { id: "M", name: "Nam" },
  { id: "F", name: "Nữ" },
];

const steps = ["Điền thông tin", "Xác nhận email", "Hoàn thành"];

function PatientRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ detail: "", province: "" });
  const [gender, setGender] = useState({ label: "Nam", value: "M" });
  const [date, setDate] = useState(dayjs(new Date()));
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [code, setCode] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 8;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setCode(result);
  };

  useEffect(() => {
    generateRandomString();
  }, []);
  const handleNextStepOne = () => {
    if (
      !name ||
      !email ||
      !address.detail ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      toast.warning("Bạn cần điền đầy đủ thông tin");
      return;
    }
    if (!validator.isMobilePhone(phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.warning("Email không hợp lệ");
      return;
    }

    // gửi email chứa mã xác nhận
    // const emailConfirmHTML = emailRegister(code,name, email);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNext = () => {
    if (code === confirmEmail)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // step :

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        // sx={{ display: "grid", placeSelf: "center" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.primary" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Kí
          </Typography>
          <Box sx={{ width: "100%", my: 5 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Bạn đã hoàn thành tạo tài khoản
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                </Box>
              </React.Fragment>
            )}
          </Box>
          <Box sx={{ mt: 3, width: { xs: "90%", md: "80%" } }}>
            {activeStep === 0 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Tên"
                      fullWidth
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Số điện thoại"
                      fullWidth
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
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
                  <Grid item xs={12} sm={6} md={6}>
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
                  <Grid item xs={12} sm={12} md={12}>
                    <AutocompleteAddress
                      setAddress={setAddress}
                      address={address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth required variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Mật khẩu
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      required
                      fullWidth
                      label="Xác nhận mật khẩu"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleNextStepOne}
                >
                  Tiếp Tục
                </Button>
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  required
                  fullWidth
                  label="Mã xác nhận email"
                  type="text"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                />
                <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={4} sm={4} md={4}>
                    <Button fullWidth variant="contained" onClick={handleBack}>
                      Quay lại
                    </Button>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <Button fullWidth variant="contained" onClick={handleNext}>
                      Xác nhận
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Typography variant="h5">TẠO TÀI KHOẢN THÀNH CÔNG</Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: "50%",
                      width: 50,
                    }}
                    image={successImg}
                    alt={"image"}
                  />
                </Stack>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{ width: "fit-content" }}
                  >
                    Đăng Nhập
                  </Button>
                </Stack>
              </>
            )}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientRegister);
