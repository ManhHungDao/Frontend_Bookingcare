import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

const SpecialtyProfile = ({
  name,
  image,
  setImage,
  setImgUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  clinic,
  enableEdit,
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
              preWidth="300px"
              preHeight="200px"
              borderRadius="0px"
              backgroundSize="cover"
              image={image}
              isDetail={true}
              setImgUpdate={setImgUpdate}
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              disableEdit={!enableEdit}
            />
            {/* <div
              className="d-flex justify-content-center mb-3"
              style={{ padding: "0px !important" }}
            >
              <div
                className="logo"
                style={{
                  position: "absolute",
                  top: isMobile ? "335px" : "300px",
                }}
              >
                <UpLoadAvatar
                  setImg={setLogo}
                  isDetail={true}
                  preWidth="80px"
                  preHeight="80px"
                  image={logo}
                  setImgUpdate={setLogoUpdate}
                  previewImgUrl={previewLogoUrl}
                  setPreviewImgUrl={setPreviewLogoUrl}
                />
              </div>
            </div> */}
            <Typography gutterBottom variant="h5">
              {name ? name : ""}
            </Typography>
            <Box>
              <Typography color="text.secondary" variant="body2">
                <HomeWorkOutlinedIcon />
                <span style={{ marginLeft: "5px" }}>
                  Phòng khám: {clinic ? clinic : ""}
                </span>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SpecialtyProfile;
