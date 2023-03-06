import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import validator from "validator";
import { Box } from "@mui/material";
import Header from "../../../components/Header.jsx";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputSelect from "../../../components/Input/InputSelect";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "./Style.scss";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import _ from "lodash";

const AddNewUser = ({
  createNewUser,
  fetchAllcode,
  allcodes,
  isSuccess,
  clearStatus,
  getListClinicAction,
  listClinic,
  getClinicByIdAction,
  listSpecialtyInClinic,
}) => {
  //infomation doctor
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("123456Aa.");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [gender, setGender] = useState("M");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));

  const [showPassword, setShowPassword] = useState(false);
  //information doctor's clinic
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [listClinicSelect, setListClinicSelect] = useState([]);
  const [listSpecialtySelect, setListSpecialtySelect] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSuccess === true) {
      setEmail("");
      setName("");
      setPhone("");
      setPassword("123456Aa.");
      setAddress("");
      setProvince("");
      setGender("M");
      setPosition("");
      setImage("");
      setDate(dayjs(new Date()));
      setClinic("");
      setSpecialty("");
      setPrice("");
      setPayment("");
      setIntroduce("");
      setNote("");
      setContent("");
      setShowPassword(false);
      setDataSelect([]);
      setPreviewImgUrl("");
      setErrors({});
    }
    clearStatus();
  }, [isSuccess]);
  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    else {
      let data = listClinic.map((e) => {
        return {
          id: e._id,
          name: e.name,
        };
      });
      setListClinicSelect(data);
    }
  }, [listClinic]);
  useEffect(() => {
    if (_.isEmpty(allcodes)) fetchAllcode();
    else
      setDataSelect(
        allcodes.map((e) => ({ id: e.keyMap, name: e.valueVI, type: e.type }))
      );
  }, [allcodes]);

  useEffect(() => {
    if (_.isEmpty(clinic) === false) getClinicByIdAction(clinic);
  }, [clinic]);

  useEffect(() => {
    if (listSpecialtyInClinic && listSpecialtyInClinic.length > 0)
      console.log(
        "🚀 ~ file: AddNewUser.js:125 ~ useEffect ~ listSpecialtyInClinic:",
        listSpecialtyInClinic
      );
    setListSpecialtySelect(
      listSpecialtyInClinic.map((e) => ({ id: e._id, name: e.name }))
    );
  }, [listSpecialtyInClinic]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeRadio = (event) => {
    setGender(event.target.value);
  };
  const controlProps = (item) => ({
    checked: gender === item,
    onChange: handleChangeRadio,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  // const convertDate = (str) => {
  //   var date = new Date(str),
  //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   return [date.getFullYear(), mnth, day].join("-");
  // };
  const checkValidate = () => {
    let errors = {};
    if (!email) errors.email = "Email không được bỏ trống";
    if (!validator.isEmail(email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!password) errors.password = "Mật khẩu không được bỏ trống";
    if (!address) errors.address = "Địa chỉ không được bỏ trống";
    if (!phone) errors.phone = "Số điện thoại không được bỏ trống";
    if (!validator.isMobilePhone(phone))
      errors.phone = "Số điện thoại không hợp lệ";
    // if (!content) errors.content = "Chi tiết không được bỏ trống";
    // if (!introduce) errors.introduce = "Mô tả không được bỏ trống";
    // if (!note) errors.note = "Ghi chú không được bỏ trống";
    // if (!position) errors.position = "Chưa chọn vị trí";
    // if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    // if (!price) errors.price = "Chưa chọn giá";
    // if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    // if (!specialty) errors.specialty = "Chưa chọn khoa";
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
    let dataUser = {
      email,
      image,
      name,
      phone,
      password,
      gender,
      positionId: position,
      detailAddress: address,
      province,
      dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
    };
    createNewUser(dataUser);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Người Dùng" subtitle="Quản lý thành viên" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  helperText={errors.email}
                  value={email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Tên"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  helperText={errors.name}
                  value={name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Số điện thoại"
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone}
                  helperText={errors.phone}
                  value={phone}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <AutocompleteAddress
                  isErr={errors.address ? true : false}
                  errName={errors.address}
                  setAddress={setAddress}
                  setProvince={setProvince}
                  address={address}
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
                  <InputSelect
                    label="Chức danh"
                    value={position}
                    onChange={setPosition}
                    data={dataSelect.filter((e) => e.type === "POSITION")}
                    isActive={true}
                    isError={errors.position ? true : false}
                    errorText={errors.position ? errors.position : ""}
                    name="Chức danh"
                    minWidth={200}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  Giới tính
                  <FormControl>
                    <div>
                      <Radio
                        {...controlProps("M")}
                        color="secondary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                      />
                      Nam
                      <Radio
                        {...controlProps("F")}
                        color="secondary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                      />
                      Nữ
                    </div>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <UpLoadAvatar
              setImg={setImage}
              content="Tải ảnh"
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="d-flex justify-content-center">
              <hr style={{ width: "50%" }} />
            </div>
          </Grid>

          <Grid item xs={12} md={3}>
            <InputSelect
              label="Chọn phòng khám"
              value={clinic}
              onChange={setClinic}
              data={listClinicSelect}
              isError={errors.clinic ? true : false}
              errorText={errors.clinic ? errors.clinic : ""}
              name="Chọn phòng khám"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputSelect
              label="Chọn chuyên khoa"
              value={specialty}
              onChange={setSpecialty}
              data={listSpecialtySelect}
              isError={errors.specialty ? true : false}
              errorText={errors.specialty ? errors.specialty : ""}
              name="Chọn chuyên khoa"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputSelect
              label="Chọn giá (VNĐ)"
              value={price}
              onChange={setPrice}
              data={dataSelect.filter((e) => e.type === "PRICE")}
              isActive={true}
              isError={errors.price ? true : false}
              errorText={errors.price ? errors.price : ""}
              name="Chọn giá (VNĐ)"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputSelect
              label="Chọn phương thức thanh toán"
              value={payment}
              onChange={setPayment}
              data={dataSelect.filter((e) => e.type === "PAYMENT")}
              isActive={true}
              isError={errors.payment ? true : false}
              errorText={errors.payment ? errors.payment : ""}
              name="Chọn phương thức thanh toán"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-multiline-flexible"
              label="Giới thiệu"
              multiline
              maxRows={20}
              fullWidth
              onChange={(e) => setIntroduce(e.target.value)}
              error={errors.introduce}
              helperText={errors.introduce}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-multiline-flexible"
              label="Ghi chú"
              multiline
              maxRows={4}
              fullWidth
              onChange={(e) => setNote(e.target.value)}
              error={errors.note}
              helperText={errors.note}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <span> Chi tiết</span>
            <CKEditorFieldBasic value={content} onChange={setContent} />
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
    language: state.app.language,
    allcodes: state.admin.allcodes,
    isSuccess: state.app.isSuccess,
    listClinic: state.admin.listClinic,
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    createNewUser: (user) => dispatch(actions.createNewUserAction(user)),
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    getClinicByIdAction: (id) => dispatch(actions.getClinicByIdAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
