import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import validator from "validator";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import "./Style.scss";
const role = [
  { id: "R1", name: "admin" },
  { id: "R2", name: "doctor" },
  { id: "R3", name: "users" },
];
const AddNewUser = ({ createNewUser, createDetailDoctor }) => {
  //infomation doctor
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("123456Aa.");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("M");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  //information doctor's clinic
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  const handleEditorChange = (value) => {
    setContent(value);
  };
  const uploadImage = async (img) => {
    setImage(img);
  };
  const handleSave = () => {
    let dataUser = {
      email: email,
      name: name,
      phoneNumber: phone,
      password: password,
      gender: gender,
      positionId: position,
      image: image,
      address: address,
    };
    let dataDetailUser = {
      content: content,
      clinicId: clinic,
      specialtyId: specialty,
      priceId: price,
      paymentId: payment,
      description: description,
      note: note,
    };
    createNewUser(dataUser);
    createDetailDoctor(dataDetailUser);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Add New User" subtitle="Managing the User Members" />
        <Grid container spacing={2} rowSpacing={{ sm: 2, md: 6 }}>
          <Grid
            container
            item
            spacing={2}
            rowSpacing={{ sm: 2, md: 6 }}
            xs={12}
            md={6}
          >
            <Grid item xs={6} md={6}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="manage-user.email" />}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={6} md={6}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="manage-user.firstName" />}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={6} md={6}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="manage-user.lastName" />}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="manage-user.phone-number" />}
                fullWidth
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              {/* <TextField
            required
            id="outlined-required"
            label={<FormattedMessage id="manage-user.password" />}
            fullWidth
          /> */}
              <FormControl fullWidth required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  <FormattedMessage id="manage-user.password" />
                </InputLabel>
                <OutlinedInput
                  defaultValue={password}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end" >
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
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} md={12}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="manage-user.address" />}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item container rowSpacing={{ sm: 2, md: 6 }}>
              {/* <Grid item xs={6} md={4}>
                <FormControl sx={{ minWidth: 80 }} size="small">
                  <InputLabel id="demo-simple-select-autowidth-label">
                    <FormattedMessage id="manage-user.role" />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    
                    label={<FormattedMessage id="manage-user.role" />}
                  >
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={6} md={4}>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-simple-select-autowidth-label">
                    <FormattedMessage id="manage-user.position" />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    label={<FormattedMessage id="manage-user.position" />}
                  >
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={4}>
                <FormattedMessage id="manage-user.gender" />
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
                    <FormattedMessage id="manage-user.male" />
                    <Radio
                      {...controlProps("F")}
                      color="secondary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                    />
                    <FormattedMessage id="manage-user.female" />
                  </div>
                </FormControl>
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
            <UpLoadAvatar uploadImage={uploadImage} />
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="d-flex justify-content-center">
              <hr style={{ width: "50%" }} />
            </div>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={12}
            spacing={2}
            rowSpacing={{ sm: 2, md: 6 }}
          >
            <Grid item xs={6} md={3}>
              <FormControl sx={{ minWidth: "100%" }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  <FormattedMessage id="admin.manage-doctor.select-clinic" />
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  label={
                    <FormattedMessage id="admin.manage-doctor.select-clinic" />
                  }
                >
                  <MenuItem value={10}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl sx={{ minWidth: "100%" }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  <FormattedMessage id="admin.manage-doctor.select-specialty" />
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  label={
                    <FormattedMessage id="admin.manage-doctor.select-specialty" />
                  }
                >
                  <MenuItem value={10}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl sx={{ minWidth: "100%" }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  <FormattedMessage id="admin.manage-doctor.select-price" />
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  label={
                    <FormattedMessage id="admin.manage-doctor.select-price" />
                  }
                >
                  <MenuItem value={10}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl sx={{ minWidth: "100%" }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  <FormattedMessage id="admin.manage-doctor.select-payment" />
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  label={
                    <FormattedMessage id="admin.manage-doctor.select-payment" />
                  }
                >
                  <MenuItem value={10}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-multiline-flexible"
                label={<FormattedMessage id="admin.manage-doctor.intro" />}
                multiline
                maxRows={20}
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-multiline-flexible"
                label={<FormattedMessage id="admin.manage-doctor.note" />}
                multiline
                maxRows={4}
                fullWidth
                onChange={(e) => setNote(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <CKEditorFieldBasic value={content} onChange={handleEditorChange} />
          </Grid>
          <Grid xs={12} md={12} item display="flex" justifyContent="flex-end">
            <ButtonComponent
              content={<FormattedMessage id="manage-user.save" />}
              handleClick={handleSave}
              bgcolor={colors.greenAccent[700]}
              color={colors.grey[100]}
              hoverBgColor={colors.greenAccent[200]}
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
    genders: state.admin.genders,
    positions: state.admin.positions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    createNewUser: (user) => dispatch(actions.createNewUser(user)),
    createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
