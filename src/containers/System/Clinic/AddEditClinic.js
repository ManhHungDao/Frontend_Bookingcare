import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import _ from "lodash";
import { Box, Grid, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import useIsMobile from "../../../components/useIsMobile.js";

const AddEditClinic = ({
  createClinicAction,
  isUploadSuccess,
  message,
  clearStatusUpload,
}) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [province, setProvince] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [previewLogoUrl, setPreviewLogoUrl] = useState("");
  const [errors, setErrors] = useState({});
  const smScreen = useIsMobile();
  useEffect(() => {
    if (message)
      if (isUploadSuccess) {
        setContent("");
        setImage("");
        setLogo("");
        setName("");
        setAddress("");
        setIntroduce("");
        setProvince("");
        setPreviewLogoUrl("");
        setCoordinates({
          lat: null,
          lng: null,
        });
        setPreviewImgUrl("");
        toast.success(message);
      } else toast.error(message);
    clearStatusUpload();
  }, [message, isUploadSuccess]);
  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!address) errors.address = "Địa chỉ không được bỏ trống";
    if (!content) errors.content = "Chi tiết không được bỏ trống";
    if (!introduce) errors.introduce = "Mô tả không được bỏ trống";
    // if (!note) errors.note = "Ghi chú không được bỏ trống";
    // if (!position) errors.position = "Chưa chọn vị trí";
    // if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    // if (!price) errors.price = "Chưa chọn giá";
    // if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    // if (!specialty) errors.specialty = "Chưa chọn khoa";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  const handleSave = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let data = {
      detail: content,
      image,
      logo,
      name,
      introduce,
      province,
      detailAddress: address,
      lat: coordinates.lat,
      lng: coordinates.lng,
    };
    createClinicAction(data);
  };
  const handleClickAddNewClinic = () => {};
  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Phòng Khám" subtitle="Quản lý phòng khám" />
        <Grid container spacing={2}>
          <Grid container xs={12} md={4} spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label="Tên"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <AutocompleteAddress
                isErr={errors.address ? true : false}
                errName={errors.address}
                setAddress={setAddress}
                setProvince={setProvince}
                setCoordinates={setCoordinates}
                address={address}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            xs={12}
            md={8}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12} md={4}>
              <UpLoadAvatar
                content="Hình đại diện"
                borderRadius="5px"
                preWidth={smScreen ? "250px" : "400px"}
                preHeight={smScreen ? "150px" : "200px"}
                setImg={setLogo}
                backgroundSize="contain"
                setPreviewImgUrl={setPreviewLogoUrl}
                previewImgUrl={previewLogoUrl}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <UpLoadAvatar
                content="Hình nền"
                borderRadius="5px"
                preHeight={smScreen ? "150px" : "200px"}
                preWidth={smScreen ? "250px" : "400px"}
                setImg={setImage}
                previewImgUrl={previewImgUrl}
                setPreviewImgUrl={setPreviewImgUrl}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            Giới thiệu
            <CKEditorFieldBasic value={introduce} onChange={setIntroduce} />
          </Grid>
          <Grid item xs={12} md={12}>
            Chi tiết
            <CKEditorFieldBasic value={content} onChange={setContent} />
          </Grid>
          <Grid xs={12} md={12} item display="flex" justifyContent="flex-end">
            <ButtonComponent
              content="Lưu"
              handleClick={handleSave}
              bgcolor="#94e2cd"
              color="#141414"
              hoverBgColor="#1e5245"
              hoverColor="#fff"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isUploadSuccess: state.app.isUploadSuccess,
    message: state.app.message,
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createClinicAction: (data) => dispatch(actions.createClinicAction(data)),
    clearStatusUpload: () => dispatch(actions.clearStatusUpload()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditClinic);
