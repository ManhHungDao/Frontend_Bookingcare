import React, { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/Section/Header";
import HomeFooter from "../../HomePage/Section/Footer";
import {
  Container,
  Box,
  TextField,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import Header from "../../../components/Header";
import { Card } from "reactstrap";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("Vui lòng không bỏ trống thông tin");
      return;
    }
    if (newPassword.length < 8) {
      toast.warning("Mật khẩu ít nhất 8 ký tự");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.warning("Xác nhận mật khẩu chưa chính xác");
      return;
    }
    toast.success("Cập nhập mật khẩu thành công");
  };
  return (
    <>
      <HomeHeader />
      <Box sx={{ mt: "65px", p: 3 }}>
        <Container>
          <Header title="đổi mật khẩu" />
          <Grid container display="flex" justifyContent={"center"}>
            <Box
              component="form"
              noValidate={false}
              // onSubmit={handleSubmit}
            >
              <TextField
                required
                fullWidth
                type="password"
                label="Mật khẩu cũ"
                autoFocus
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mật khẩu mới"
                type="password"
                id="password"
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Xác nhận mật khẩu mới"
                type="password"
                id="password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="d-flex justify-content-end mt-2">
                <Button
                  margin="normal"
                  variant="contained"
                  onClick={handleUpdate}
                >
                  Cập nhập
                </Button>
              </div>
            </Box>
          </Grid>
        </Container>
      </Box>
      <HomeFooter />
    </>
  );
};

export default ChangePassword;
