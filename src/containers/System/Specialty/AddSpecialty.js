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
import { toast } from "react-toastify";

const AddSpecialty = ({
  listClinic,
  getListClinicAction,
  isSuccess,
  clearStatus,
  createSpecialtyAction,
  allcodeType,
  fetchAllcodeByTypeAction,
}) => {
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
    if (isPopular === true) setSelectClinic("");
  }, [isPopular]);

  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinicAction();
    else {
      setDataClinic(listClinic.map((e) => ({ value: e._id, label: e.name })));
    }
    if (_.isEmpty(allcodeType)) fetchAllcodeByTypeAction("SPECIALTY");
    else {
      setDataSpecialty(
        allcodeType.map((e) => ({ value: e.keyMap, label: e.valueVI }))
      );
    }
  }, [listClinic, allcodeType]);

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

  const handleSave = () => {
    if (!selectSpecialty) {
      toast.error("Chưa chọn tên chuyên khoa");
      return;
    }
    let data = {
      detail: content,
      image,
      name: selectSpecialty.label ? selectSpecialty.label : "",
      keyMap: selectSpecialty.value ? selectSpecialty.value : "",
      clinic: {
        id: selectClinic.value ? selectClinic.value : null,
        name: selectClinic.label ? selectClinic.label : null,
      },
      popular: isPopular,
    };
    createSpecialtyAction(data);
  };
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
              {!isPopular && (
                <Grid item xs={12} md={12}>
                  <Select
                    value={selectClinic}
                    onChange={setSelectClinic}
                    options={dataClinic}
                    placeholder="Chọn phòng khám"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                <Select
                  value={selectSpecialty}
                  onChange={setSelectSpecialty}
                  options={dataSpecialty}
                  placeholder="Chọn chuyên khoa"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  }}
                />
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
    allcodeType: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecialtyAction: (data) =>
      dispatch(actions.createSpecialtyAction(data)),
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    fetchAllcodeByTypeAction: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialty);
