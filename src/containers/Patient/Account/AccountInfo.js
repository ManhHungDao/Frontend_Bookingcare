import React, { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/Section/Header";
import HomeFooter from "../../HomePage/Section/Footer";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Header from "../../../components/Header";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import { toast } from "react-toastify";

const AccountInfo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ detail: "", province: "" });
  const [gender, setGender] = useState("M");
  const [date, setDate] = useState(dayjs(new Date()));
  const [name, setName] = useState("");

  useEffect(() => {}, []);

  const handleUpdate = () => {
    toast.success("Cập nhập mật khẩu thành công");
  };

  return (
    <>
      <HomeHeader />
      <Box sx={{ mt: "65px", p: 3 }}>
        <Container>
          <Header title="Thông tin cá nhân" />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="outlined-required"
                label="Tên"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Giới tính
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Giới tính"
                  fullWidth
                >
                  <MenuItem value={"M"}>Nam</MenuItem>
                  <MenuItem value={"F"}>Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <AutocompleteAddress setAddress={setAddress} address={address} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" onClick={handleUpdate}>
                Cập nhập
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <HomeFooter />
    </>
  );
};

export default AccountInfo;
