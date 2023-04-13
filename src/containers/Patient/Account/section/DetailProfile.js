import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  CardHeader,
  OutlinedInput,
} from "@mui/material";
import ButtonComponent from "../../../../components/ButtonComponent";
import dayjs from "dayjs";
import _ from "lodash";

export const PatientProfile = ({ data }) => {
  const user = data.schedule.user;
  return (
    <Card>
      <CardHeader title="Thông tin đặt lịch" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên:&nbsp;
              {user?.name ? user.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Email:&nbsp;
              {user?.email ? user.email : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Số điện thoại:&nbsp;
              {user?.phone ? user.phone : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giới tính:&nbsp;
              {user?.gender === "M" ? "Nam" : "Nữ"}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ngày sinh:&nbsp;
              {user?.dayOfBirth
                ? dayjs(new Date(user.dayOfBirth)).format("DD/MM/YYYY")
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Lý do khám:&nbsp;
              {user?.reason ? user.reason : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const DetailExam = ({ data }) => {
  const [doctor] = data.doctor;
  const [packet] = data.packet;
  return (
    <Card>
      <CardHeader title="Thông tin khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên bác sĩ:&nbsp;
              {doctor?.name ? doctor?.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Tên gói khám:&nbsp;
              {packet?.name ? packet?.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Cơ sở:&nbsp;
              {doctor
                ? doctor?.detail?.clinic?.name
                : packet?.clinic?.name
                ? packet?.clinic?.name
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Chuyên khoa:&nbsp;
              {doctor
                ? doctor?.detail?.specialty?.name
                : packet?.type?.specialty?.name
                ? packet?.type?.specialty?.name
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giá khám:&nbsp;
              {data?.detail?.price?.name ? data.detail.price.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Phương thức thanh toán:&nbsp;
              {data?.detail?.payment?.name ? data.detail.payment.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ghi chú:&nbsp;
              {data?.detail?.note ? data?.detail?.note : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const ScheduleProfile = ({ time, status, setStatus, handleSave }) => {
  let statusList = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang khám",
    "Hoàn thành",
    "Đã hủy",
  ];

  if (status === "Chờ xác nhận") {
    statusList = ["Chờ xác nhận", "Đã xác nhận", "Đã hủy"];
  }
  if (_.isArray(status))
    if (["Chờ xác nhận", "Đã xác nhận", "Đã hủy"].includes(status[0]))
      statusList = ["Chờ xác nhận", "Đã xác nhận", "Đã hủy"];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Card>
      <CardHeader title="Thông tin lịch khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography gutterBottom variant="subtitle1">
              Thời gian:&nbsp;{time}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                disabled={status === "Đã xác nhận" || status === "Đã hủy"}
              >
                <InputLabel id="demo-simple-select-label">
                  Trạng trái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleChange}
                  input={<OutlinedInput label="Trạng trái" />}
                >
                  {statusList.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
          >
            <ButtonComponent
              disabled={status === "Đã xác nhận" || status === "Đã hủy"}
              content="Lưu"
              handleClick={handleSave}
              bgcolor="#94e2cd"
              color="#141414"
              hoverBgColor="#1e5245"
              hoverColor="#fff"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
