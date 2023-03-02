import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { CommonUtils } from "../../../../utils";

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
}) => {
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  const handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const url = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      setImage(base64);
      setPreviewImgUrl(url);
    }
  };

  const style = {
    width: "80px",
    height: "80px",
    borderRadius: "100vmax",
    border: "2px solid #ddd",
    cursor: "pointer",
    background: "center center no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${previewImgUrl ? previewImgUrl : image})`,
  };

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
            <div className="preview-img-container mb-3">
              <div className="preview-image" style={style}></div>
            </div>
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
        <Divider />
        <CardActions>
          <Button component="label" fullWidth variant="text">
            Tải ảnh
            <input
              type="file"
              hidden
              onChange={(event) => handleOnChangeImage(event)}
            />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AccountProfile;
