import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { CommonUtils } from "../../../../utils";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import "../Style.scss";
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
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              image={image}
            />
            {/* <div className="preview-img-container mb-3">
              <div className="preview-image" style={style}>
                <label
                  style={{
                    position: "absolute",
                    right: "0px",
                    bottom: " -5px",
                    padding: " 0px !important",
                    width: "10px !important",
                    backgroundColor: "transparent",
                  }}
                >
                  <PhotoCamera />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(event) => handleOnChangeImage(event)}
                  />
                </label>
              </div>
            </div> */}
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
            <Typography color="text.secondary" variant="body2">
              {email} - {phone}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {address?.detail ? address.detail : ""}
            </Typography>
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
