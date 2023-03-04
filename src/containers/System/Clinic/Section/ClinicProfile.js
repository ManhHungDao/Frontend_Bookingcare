import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import useIsMobile from "../../../../components/useScreen/useIsMobile";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ClinicProfile = ({
  name,
  address,
  image,
  setImage,
  logo,
  setLogo,
  setImgUpdate,
  setLogoUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  previewLogoUrl,
  setPreviewLogoUrl,
}) => {
  const isMobile = useIsMobile();
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
            />
            <div
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
            </div>
            <Typography gutterBottom variant="h5">
              {name ? name : ""}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                className="clinic-profile__detail--text"
                color="text.secondary"
                variant="body2"
              >
                <LocationOnIcon /> {address ? address : ""}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ClinicProfile;
