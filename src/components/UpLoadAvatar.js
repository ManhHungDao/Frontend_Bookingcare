import React from "react";
import { FormattedMessage } from "react-intl";
import avatar from "../assets/avatar-trang-4.jpg";
import Lightbox from "react-image-lightbox";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { languages, CRUD_ACTIONS, CommonUtils } from "../utils";

const UpLoadAvatar = ({ uploadImage }) => {
  const [previewImgUrl, setPreviewImgUrl] = React.useState("");
  const [openPreImg, setOpenPreImg] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const url = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      uploadImage(base64);
      setPreviewImgUrl(url);
    }
  };
  const openReviewImage = () => {
    if (!previewImgUrl) return;
    setOpenPreImg(true);
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
          <FormattedMessage id="manage-user.upload" />
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
          style={{
            backgroundImage: `url(${previewImgUrl ? previewImgUrl : avatar})`,
          }}
          onClick={() => openReviewImage()}
        ></div>
      </div>
      {openPreImg === true && (
        <Lightbox
          mainSrc={previewImgUrl}
          onCloseRequest={() => setOpenPreImg(false)}
        />
      )}
    </>
  );
};

export default UpLoadAvatar;
