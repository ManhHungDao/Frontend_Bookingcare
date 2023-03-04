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
import useIsTablet from "../../../components/useScreen/useIsTablet";

const AddSpecialty = ({
  listClinic,
  getListClinicAction,
  message,
  isSuccess,
  clearStatus,
  createSpecialtyAction,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [clinic, setClinic] = useState("");
  const [content, setContent] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [dataClinic, setDataClinic] = useState([]);
  const [isPopular, setIsPopular] = useState(false);
  const smScreen = useIsTablet();

  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    else {
      setDataClinic(listClinic.map((e) => ({ id: e._id, name: e.name })));
    }
  }, [listClinic]);
  useEffect(() => {
    if (message)
      if (isSuccess) {
        setContent("");
        setImage("");
        setName("");
        setPreviewImgUrl("");
        toast.success(message);
      } else toast.error(message);
    clearStatus();
  }, [message, isSuccess]);
  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!content) errors.content = "Địa chỉ không được bỏ trống";
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
      name,
      clinicId: clinic ? clinic : null,
    };
    createSpecialtyAction(data);
  };
  const handleClickAddNewSpecialty = () => {};
  return (
    <>
      <Box m="20px">
        <Header
          title="Thêm Mới Chuyên Khoa"
          isShowSwitch={true}
          titleSwich={"Phổ biến"}
          isChecked={isPopular}
          setChecked={setIsPopular}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {isPopular && (
                <Grid item xs={12} md={12}>
                  <InputSelect
                    label="Chọn phòng khám"
                    value={clinic}
                    onChange={setClinic}
                    data={dataClinic}
                    isError={errors.clinic ? true : false}
                    errorText={errors.clinic ? errors.clinic : ""}
                    name="Chọn phòng khám"
                    // minWidth="90%"
                  />
                </Grid>
              )}
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
              borderRadius="5px"
              preHeight={smScreen ? "150px" : "200px"}
              preWidth={smScreen ? "250px" : "400px"}
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
    isSuccess: state.app.isSuccess,
    message: state.app.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecialtyAction: (data) =>
      dispatch(actions.createSpecialtyAction(data)),
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialty);
