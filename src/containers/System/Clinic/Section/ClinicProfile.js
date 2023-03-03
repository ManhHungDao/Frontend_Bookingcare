import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import useIsMobile from "../../../../components/useScreen/useIsMobile";
const ClinicProfile = ({
  name,
  address,
  image,
  setImage,
  logo,
  setLogo,
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
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              image={image}
              isDetail={true}
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
                  previewImgUrl={previewLogoUrl}
                  setPreviewImgUrl={setPreviewLogoUrl}
                  image={logo}
                />
              </div>
            </div>
            <Typography gutterBottom variant="h5">
              {name ? name : ""}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {address?.detail ? address.detail : ""}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ClinicProfile;
