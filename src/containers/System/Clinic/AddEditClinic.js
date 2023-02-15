import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import "./ModalAddEditClinic.scss";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import _ from "lodash";
import { Box, Typography, useTheme, Grid, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import { tokens } from "../theme";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";

const AddEditClinic = ({ createClinicAction }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  const [errors, setErrors] = useState({});
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
    console.log("🚀 ~ file: AddEditClinic.js:70 ~ handleSave ~ data", data);
    createClinicAction(data);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Phòng Khám" subtitle="Quản lý phòng khám" />
        <Grid container spacing={2} rowSpacing={{ sm: 2, md: 6 }}>
          <Grid container item xs={12} md={4}>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label="Tên"
                fullWidth
                onChange={(e) => setName(e.target.value)}
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
            item
            spacing={2}
            rowSpacing={{ sm: 2, md: 6 }}
            xs={12}
            md={8}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12} md={4}>
              <UpLoadAvatar
                content="Hình nền"
                borderRadius="5px"
                preWidth="400px"
                setImg={setImage}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <UpLoadAvatar
                content="Hình đại diện"
                borderRadius="5px"
                preWidth="400px"
                setImg={setLogo}
                backgroundSize="contain"
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
              bgcolor={colors.greenAccent[700]}
              color={colors.grey[100]}
              hoverBgColor={colors.greenAccent[200]}
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
    language: state.app.language,
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createClinicAction: (data) => dispatch(actions.createClinicAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditClinic);
