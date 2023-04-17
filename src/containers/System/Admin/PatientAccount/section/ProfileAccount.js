import React from "react";
import { Typography, Card, CardContent, CardHeader } from "@mui/material";
import dayjs from "dayjs";

const ProfileAccount = (data) => {
  return (
    <>
      <Card>
        <CardHeader title="Thông tin tài khoản" />
        <CardContent>
          <Typography variant="subtitle1">Email: {data.data.email}</Typography>
          <Typography variant="subtitle1">Tên: {data.data.name}</Typography>
          <Typography variant="subtitle1">
            Giới tính: {data.data.gender === "M" ? "Nam" : "Nữ"}
          </Typography>
          <Typography variant="subtitle1">
            Ngày sinh:{" "}
            {dayjs(new Date(data.data.dateOfBirth)).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="subtitle1">
            Số điện thoại: {data.data.phone}
          </Typography>
          <Typography variant="subtitle1">
            Địa chỉ: {data.data.address.detail}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileAccount;
