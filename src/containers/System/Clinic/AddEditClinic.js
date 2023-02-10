import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import "./ModalAddEditClinic.scss";
import { FormattedMessage } from "react-intl";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import _ from "lodash";
import { Box, Typography, useTheme, Grid, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import { tokens } from "../theme";
import Loading from "../../../components/Loading";

const AddEditClinic = ({ createClinicAction }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [introduce, setIntroduce] = useState("");

  const handleOnChangeLogo = (logo) => setLogo(logo);
  const handleOnChangeImage = (image) => setImage(image);
  const handleEditorChangeNote = (data) => setIntroduce(data);
  const handleEditorChangeContent = (data) => setContent(data);
  const handleSave = () => {
    createClinicAction({
      detail: content,
      image,
      logo,
      name,
      detailAddress: address,
      introduce,
      province: "hashcode",
    });
  };
  return (
    <>
      <Box m="20px">
        <Header title="Add New Clinic" subtitle="Managing the Clinics" />
        <Grid container spacing={2} rowSpacing={{ sm: 2, md: 6 }}>
          <Grid container item xs={12} md={4}>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="admin.manage-clinic.name" />}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label={<FormattedMessage id="admin.manage-clinic.address" />}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
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
                content={<FormattedMessage id="admin.manage-clinic.image" />}
                borderRadius="5px"
                preWidth="400px"
                uploadImage={handleOnChangeImage}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <UpLoadAvatar
                content={<FormattedMessage id="admin.manage-clinic.logo" />}
                borderRadius="5px"
                preWidth="400px"
                uploadImage={handleOnChangeLogo}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormattedMessage id="admin.manage-clinic.introduce" />
            <CKEditorFieldBasic
              value={content}
              onChange={handleEditorChangeNote}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormattedMessage id="admin.manage-doctor.detail" />
            <CKEditorFieldBasic
              value={content}
              onChange={handleEditorChangeContent}
            />
          </Grid>
          <Grid xs={12} md={12} item display="flex" justifyContent="flex-end">
            <ButtonComponent
              content={<FormattedMessage id="manage-user.save" />}
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
