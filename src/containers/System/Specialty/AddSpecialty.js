import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import Header from "../../../components/Header.jsx";
import Grid from "@mui/material/Grid";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";
import useIsTablet from "../../../components/useScreen/useIsTablet";
import Select from "react-select";

const AddSpecialty = ({
  listClinic,
  getListClinicAction,
  isSuccess,
  clearStatus,
  createSpecialtyAction,
  listSpeciaty,
}) => {
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [dataClinic, setDataClinic] = useState([]);
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [isPopular, setIsPopular] = useState(false);
  const [selectClinic, setSelectClinic] = useState("");
  const [selectSpecialty, setSelectSpecialty] = useState("");
  const smScreen = useIsTablet();

  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    else {
      setDataClinic(listClinic.map((e) => ({ value: e._id, label: e.name })));
    }
    // if (_.isEmpty(listSpeciaty)) getListClinicAction();
    // else {
    //   setDataClinic(listSpeciaty.map((e) => ({ value: e._id, label: e.name })));
    // }
  }, [listClinic, listSpeciaty]);

  useEffect(() => {
    if (isSuccess === true) {
      setContent("");
      setImage("");
      setPreviewImgUrl("");
      setSelectClinic("");
      setSelectSpecialty("");
    }
    clearStatus();
  }, [isSuccess]);

  const checkValidate = () => {
    let errors = {};
    if (!selectSpecialty) errors.selectSpecialty = "Chọn tên chuyên khoa";
    return errors;
  };

  const handleSave = () => {
    const errors = checkValidate();
    if (_.isEmpty(errors) === false) {
      setErrors(errors);
      return;
    }
    // let data = {
    //   detail: content,
    //   image,
    //   name,
    //   clinicId: clinic ? clinic : null,
    // };
    // createSpecialtyAction(data);
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
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {isPopular && (
                <Grid item xs={12} md={12}>
                  <Select
                    defaultValue={selectClinic}
                    onChange={setSelectClinic}
                    options={dataClinic}
                    placeholder="Chọn phòng khám"
                  />
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                {/* <TextField
                  required
                  id="outlined-required"
                  label="Tên"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  helperText={errors.name}
                  value={name}
                /> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
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
    listClinic: state.admin.listClinic,
    isSuccess: state.app.isSuccess,
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
