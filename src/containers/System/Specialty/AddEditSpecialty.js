import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import validator from "validator";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../../../components/Header.jsx";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import InputSelect from "../../../components/Input/InputSelect";
import { toast } from "react-toastify";
import _ from "lodash";
const AddEditSpecialty = ({ listClinic, getListClinicAction }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [clinic, setClinic] = useState("");
  const [content, setContent] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [dataClinic, setDataClinic] = useState([]);

  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    else {
      setDataClinic(listClinic.map((e) => ({ id: e._id, name: e.name })));
    }
  }, [listClinic]);

  const handleSave = () => {};

  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Chuyên Khoa" subtitle="Quản lýchuyên khoa" />
        <Grid container spacing={2} rowSpacing={{ sm: 2, md: 6 }}>
          <Grid
            container
            item
            // spacing={2}
            // rowSpacing={{ sm: 2, md: 6 }}
            xs={12}
            md={6}
          >
            <Grid item xs={12} md={12}>
              <InputSelect
                label="Chọn phòng khám"
                value={clinic}
                onChange={setClinic}
                data={dataClinic}
                isError={errors.clinic ? true : false}
                errorText={errors.clinic ? errors.clinic : ""}
                name="Chọn phòng khám"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label="Tên"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                helperText={errors.name}
                value={name}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <UpLoadAvatar
              setImg={setImage}
              content="Tải ảnh"
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
            />
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
    listClinic: state.admin.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    clearStatusUpload: () => dispatch(actions.clearStatusUpload()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEditSpecialty);
