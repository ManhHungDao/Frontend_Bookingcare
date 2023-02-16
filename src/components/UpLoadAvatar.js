import React from "react";
import avatar from "../assets/avatar-trang-4.jpg";
import Lightbox from "react-image-lightbox";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { CommonUtils } from "../utils";

const UpLoadAvatar = ({
  setImg,
  preWidth,
  preHeight,
  borderRadius,
  backgroundSize,
  content,
  setPreviewImgUrl,
  previewImgUrl,
}) => {
  const [openPreImg, setOpenPreImg] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const url = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      setImg(base64);
      setPreviewImgUrl(url);
    }
  };
  const openReviewImage = () => {
    if (!previewImgUrl) return;
    setOpenPreImg(true);
  };
  const style = {
    width: preWidth ? preWidth : "200px",
    height: preHeight ? preHeight : "200px",
    borderRadius: borderRadius ? borderRadius : "100vmax",
    border: "2px solid #ddd",
    cursor: "pointer",
    background: "center center no-repeat",
    backgroundSize: backgroundSize ? backgroundSize : "cover",
    backgroundImage: `url(${previewImgUrl})`,
  };
  return (
    <>
      <div className="preview-img-container">
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary[900],
            color: colors.grey[100],
            ":hover": {
              bgcolor: "primary.main", // theme.palette.primary.main
              color: "white",
            },
          }}
          component="label"
          endIcon={<PhotoCamera />}
        >
          {content}
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(event) => handleOnChangeImage(event)}
          />
        </Button>
        <div
          className="preview-image"
          style={style}
          onClick={() => openReviewImage()}
        ></div>
      </div>
      {openPreImg && previewImgUrl && (
        <Lightbox
          mainSrc={previewImgUrl}
          onCloseRequest={() => setOpenPreImg(false)}
        />
      )}
    </>
  );
};

export default UpLoadAvatar;
