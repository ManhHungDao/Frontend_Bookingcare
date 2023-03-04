import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

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
                          {i.name} - {name}
                        </Typography>
                      </Box>
                    );
                })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap:1
              }}
            >
              <Typography
                className="account-profile__detail"
                color="text.secondary"
                variant="body2"
              >
                <EmailIcon />
                {email}
              </Typography>
              <Typography
                className="account-profile__detail"
                color="text.secondary"
                variant="body2"
              >
                <PhoneIcon />
                {phone}
              </Typography>
              <Typography
                className="account-profile__detail"
                color="text.secondary"
                variant="body2"
              >
                <LocationOnIcon />
                {address}
              </Typography>
              <Typography
                className="account-profile__detail"
                color="text.secondary"
                variant="body2"
              >
                <HomeRepairServiceIcon />
               nơi làm việc - chuyên khoa
              </Typography>
            </Box>
          </Box>
        </CardContent>
        {/* <Divider />
        <CardActions>
          <Button component="label" fullWidth variant="text">
            Tải ảnh
            <input
              type="file"
              hidden
              onChange={(event) => handleOnChangeImage(event)}
            />
          </Button>
        </CardActions> */}
      </Card>
    </>
  );
};

export default AccountProfile;
