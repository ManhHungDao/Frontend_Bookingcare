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
  FormHelperText,
} from "@mui/material";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../../components/ButtonComponent";

export const PatientProfile = ({ patient }) => {
  return (
    <Card>
      <CardHeader title="Thông tin bệnh nhân" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Bệnh nhân:&nbsp;
              {patient?.name ? patient.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Email:&nbsp;
              {patient?.email ? patient.email : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Số điện thoại:&nbsp;
              {patient?.phone ? patient.phone : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ngày sinh:&nbsp;
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Lý do khám:&nbsp;
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const DoctorProfile = ({ doctor }) => {
  const { detail, clinic, specialty } = doctor;
  return (
    <Card>
      <CardHeader title="Thông tin bác sĩ" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên bác sĩ:&nbsp;
              {doctor?.name ? doctor.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Cơ sở:&nbsp;
              {clinic?.name ? clinic.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Chuyên khoa:&nbsp;
              {specialty?.name ? specialty.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giá khám:&nbsp;
              {detail?.price?.name ? detail.price.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Phương thức thanh toán:&nbsp;
              {detail?.payment?.name ? detail.payment.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ghi chú:&nbsp;{detail?.note ? detail.note : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const PacketProfile = ({ packet }) => {
  const { detail, clinic, specialty } = packet;
  return (
    <Card>
      <CardHeader title="Thông tin gói khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên gói khám:&nbsp;
              {packet?.name ? packet.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Cơ sở:&nbsp;
              {clinic?.name ? clinic.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Chuyên khoa:&nbsp;
              {specialty?.name ? specialty.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giá khám:&nbsp;
              {detail?.price?.name ? detail.price.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Phương thức thanh toán:&nbsp;
              {detail?.payment?.name ? detail.payment.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ghi chú:&nbsp;
              {detail?.note ? detail.note : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const ScheduleProfile = ({ time, status, setStatus, handleSave }) => {
  const statusList = ["Lịch hẹn mới", "Đang khám", "Hoàn thành", "Đã hủy"];
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
                disabled={status === "Đã hủy" || status === "Hoàn thành"}
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
              disabled={status === "Đã hủy" || status === "Hoàn thành"}
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
export const ResponseDetail = ({
  content,
  setContent,
  handleSave,
  title,
  setTitle,
  errors,
}) => {
  const titleList = ["Đơn thuốc", "Thông tin hủy lịch"];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Card>
      <CardHeader title="Thông tin phản hồi" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth error={errors?.title ? true : false}>
                <InputLabel id="demo-simple-select-error-label">
                  Loại tiêu đề
                </InputLabel>
                <Select
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  value={title}
                  onChange={handleChange}
                  input={<OutlinedInput label="Loại tiêu đề" />}
                >
                  {titleList.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors?.title ? errors.title : ""}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <CKEditorFieldBasic
              title="Chi tiết phản hồi"
              value={content}
              onChange={setContent}
              isError={errors.content ? true : false}
              errorText={errors.content}
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
