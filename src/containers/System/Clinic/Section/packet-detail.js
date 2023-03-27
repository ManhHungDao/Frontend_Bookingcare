import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import InputSelect from "../../../../components/Input/InputSelect";
import { connect } from "react-redux";

const PacketDetail = ({
  clinic,
  specialty,
  name,
  setName,
  errors,
  price,
  setPrice,
  dataSelect,
  payment,
  setPayment,
  introduce,
  setIntroduce,
  type,
}) => {
  return (
    <>
      <Card>
        <CardHeader title="Thông tin chung" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={8}>
                <TextField
                  id="outlined-required"
                  label="Phòng khám"
                  fullWidth
                  value={clinic}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  id="outlined-required"
                  label="Loại"
                  fullWidth
                  value={type}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  id="outlined-required"
                  label="Chuyên khoa"
                  fullWidth
                  value={specialty}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <InputSelect
                  label="Chọn phương thức thanh toán"
                  value={payment}
                  onChange={setPayment}
                  data={dataSelect.filter((e) => e.type === "PAYMENT")}
                  isError={errors.payment ? true : false}
                  errorText={errors.payment ? errors.payment : ""}
                  name="Chọn phương thức thanh toán"
                />
              </Grid>
              <Grid xs={12} md={4}>
                <InputSelect
                  label="Chọn giá (VNĐ)"
                  value={price}
                  onChange={setPrice}
                  data={dataSelect.filter((e) => e.type === "PRICE")}
                  isError={errors.price ? true : false}
                  errorText={errors.price ? errors.price : ""}
                  name="Chọn giá (VNĐ)"
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Tên"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  value={name}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Giới thiệu"
                  multiline
                  required
                  maxRows={5}
                  fullWidth
                  onChange={(e) => setIntroduce(e.target.value)}
                  error={errors.introduce ? true : false}
                  helperText={errors.introduce}
                  value={introduce}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PacketDetail);
