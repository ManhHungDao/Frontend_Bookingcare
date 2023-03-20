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
  Button,
} from "@mui/material";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../../components/ButtonComponent";

export const PatientProfile = ({ patient }) => {
  return (
    <Card>
      <CardHeader title="Thông tin cá nhân" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Bệnh nhân:
              {patient?.name ? patient.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Email:
              {patient?.email ? patient.email : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Số điện thoại:
              {patient?.phone ? patient.phone : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const ScheduleProfile = ({ dataTime, time, status, setStatus }) => {
  return (
    <Card>
      <CardHeader title="Thông tin lịch khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item sx={12} md={6} lg={6}>
            <Typography gutterBottom variant="subtitle1">
              Thời gian:
              {dataTime.map((e) => {
                if (e._id === time) return e.valueEN;
              })}
            </Typography>
          </Grid>
          <Grid item sx={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Trạng trái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status?.value}
                  label="Trạng thái"
                  onChange={setStatus}
                >
                  <MenuItem value={1}>Lịch hẹn mới</MenuItem>
                  <MenuItem value={2}>Đang khám</MenuItem>
                  <MenuItem value={3}>Hoàn thành</MenuItem>
                  <MenuItem value={4}>Đã hủy</MenuItem>
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
              content="Lưu"
              // handleClick={handleSave}
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
export const ResponseDetail = ({
  dataTime,
  time,
  status,
  setStatus,
  content,
  setContent,
}) => {
  return (
    <Card>
      <CardHeader title="Thông tin phản hồi" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item sx={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại tiêu đề
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status?.value}
                  label="Trạng thái"
                  onChange={setStatus}
                >
                  <MenuItem value={1}>Phản hồi sau khám</MenuItem>
                  <MenuItem value={2}>Thông tin hủy lịch</MenuItem>
                  <MenuItem value={3}>Thông tin dời lịch</MenuItem>
                  <MenuItem value={4}>Đơn thuốc</MenuItem>
                  <MenuItem value={4}>Nhắc lịch khám bệnh</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sx={12} md={12}>
            <CKEditorFieldBasic
              title="Chi tiết phản hồi"
              value={content}
              onChange={setContent}
            />
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
              content="Gửi"
              // handleClick={handleSave}
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
