import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import ButtonComponent from "../../../components/ButtonComponent";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import SpecialtyProfile from "./section/SpecialtyProfile";
import SpecialtyDetail from "./section/specialty-detail";
import _ from "lodash";

const DetailSpecialty = ({ specialty, open, setOpen, isSuccess }) => {
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [key, setKey] = useState("");
  //
  const [selectClinic, setSelectClinic] = useState({});
  const [selectSpecialty, setSelectSpecialty] = useState({});
  const [imgUpdate, setImgUpdate] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [dataClinic, setDataClinic] = useState([]);
  const [dataSpecialty, setDataSpecialty] = useState([]);

  useEffect(() => {
    setImage(specialty?.image?.url ? specialty.image.url : "");
    setDetail(specialty?.detail ? specialty.detail : "");
    setKey(specialty?.key ? specialty.key : "");
    setSelectSpecialty({
      label: specialty?.name ? specialty.name : "",
      value: specialty?.key ? specialty.key : "",
    });
    setSelectClinic({
      label: specialty?.clinic?.name ? specialty?.clinic?.name : "",
      value: specialty?.clinic?.id ? specialty?.clinic?.id : "",
    });
  }, [specialty]);

  const handleSave = () => ({});
  const handleClose = () => {
    setOpen(false);
    setImage("");
    setDetail("");
    setPreviewImgUrl("");
    setEnableEdit(false);
    setImgUpdate(null);
    setSelectClinic({});
    setSelectSpecialty({});
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: enableEdit ? "80vh" : "fit-content",
    maxHeight: "80vh",
    overflowY: "scroll",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box m="20px">
            <Header
              title="Chi tiết phòng khám"
              isShowSwitch={true}
              titleSwich={"Chỉnh sửa"}
              isChecked={enableEdit}
              setChecked={setEnableEdit}
            />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Container maxWidth="lg">
              <Stack>
                <Grid container spacing={3}>
                  <Grid
                    xs={12}
                    md={enableEdit ? 6 : 12}
                    lg={enableEdit ? 4 : 12}
                  >
                    <SpecialtyProfile
                      name={specialty?.name ? specialty?.name : ""}
                      image={image}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      clinic={specialty?.clinic ? specialty?.clinic : {}}
                      dataClinic={dataClinic}
                      dataSpecialty={dataSpecialty}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <SpecialtyDetail
                          selectSpecialty={selectSpecialty}
                          setSelectSpecialty={setSelectSpecialty}
                          selectClinic={selectClinic}
                          setSelectClinic={setSelectClinic}
                        />
                      </Grid>
                      <Grid xs={12} md={12} lg={12}>
                        <Card>
                          <CardHeader title="Thông tin cá nhân" />
                          <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                              <Grid container spacing={3}>
                                <Grid>
                                  <CKEditorFieldBasic
                                    value={detail}
                                    onChange={setDetail}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  {enableEdit && (
                    <ButtonComponent
                      content="Lưu"
                      handleClick={handleSave}
                      bgcolor="#94e2cd"
                      color="#141414"
                      hoverBgColor="#1e5245"
                      hoverColor="#fff"
                    />
                  )}
                </Grid>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClinic: (id, data) => dispatch(actions.updateClinicAction(id, data)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
