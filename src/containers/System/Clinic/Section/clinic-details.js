import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AutocompleteAddress from "../../../../components/Input/AutocompleteAddress";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";


export const ClinicDetail = ({
  name,
  setName,
  introduce,
  setIntroduce,
  coordinates,
  setCoordinates,
  address,
  setAddress,
  errors,
}) => {
  return (
    <>
      <Card>
        <CardHeader title="Thông tin cá nhân" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                {/* <AutocompleteAddress
                  isErr={errors?.address ? true : false}
                  errName={errors?.address ? errors?.address : ""}
                  setAddress={setAddress}
                  setProvince={setProvince}
                  address={address}
                /> */}
                <TextField
                  fullWidth
                  label="Tên"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </Grid>
              <Grid className="detail__clinic--introduce">
                <CKEditorFieldBasic value={introduce} onChange={setIntroduce} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
