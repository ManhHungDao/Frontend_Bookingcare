import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const role = [
  {
    id: "R1",
    name: "admin",
    icon: <AdminPanelSettingsOutlinedIcon />,
    bgcolor: "#4cceac",
  },
  {
    id: "R2",
    name: "doctor",
    icon: <SecurityOutlinedIcon />,
    bgcolor: "#2e7c67",
  },
  {
    id: "R3",
    name: "users",
    icon: <LockOpenOutlinedIcon />,
    bgcolor: "#2e7c67",
  },
];

const AccountProfile = ({
  name,
  email,
  position,
  roleId,
  address,
  image,
  setImage,
  phone,
  setImgUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  enableEdit,
  clinic,
  specialty,
  introduce,
}) => {
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <UpLoadAvatar
              setImg={setImage}
              isDetail={true}
              preWidth="80px"
              preHeight="80px"
              image={image}
              setImgUpdate={setImgUpdate}
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              disableEdit={!enableEdit}
            />
            <Typography gutterBottom variant="h5">
              {role &&
                role.map((i) => {
                  if (i.id === roleId)
                    return (
                      <Box
                        width="100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={i.bgcolor}
                        borderRadius="4px"
                        key={i.id}
                      >
                        {i.icon}
                        <Typography
                          color="#141414"
                          sx={{ ml: "5px", textTransform: "uppercase" }}
                        >
                          {i.name} - {name ? name : ""}
                        </Typography>
                      </Box>
                    );
                })}
            </Typography>
            <Grid container spacing={2} display="flex" justifyContent="center">
              <Grid item md={enableEdit ? 12 : 4} sm={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    className="account-profile__detail"
                    color="text.secondary"
                    variant="body2"
                  >
                    <EmailIcon />
                    {email ? email : ""}
                  </Typography>
                  <Typography
                    className="account-profile__detail"
                    color="text.secondary"
                    variant="body2"
                  >
                    <PhoneIcon />
                    {phone ? phone : ""}
                  </Typography>
                  <Typography
                    className="account-profile__detail"
                    color="text.secondary"
                    variant="body2"
                  >
                    <LocationOnIcon />
                    {address?.detail ? address.detail : ""}
                  </Typography>

                  <Typography
                    className="account-profile__detail"
                    color="text.secondary"
                    variant="body2"
                  >
                    <HomeRepairServiceIcon />
                    {clinic?.label ? clinic.label : ""} -
                    {specialty?.label ? specialty.label : ""}
                  </Typography>
                </Box>
              </Grid>
              {!enableEdit && (
                <Grid item md={4} sm={12}>
                  <Typography color="text.secondary" variant="body2">
                    <AccountCircleIcon />
                    <span style={{ marginLeft: "5px" }}>
                      {introduce ? introduce : ""}
                    </span>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountProfile;
