import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
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
import ButtonComponent from "../../../components/ButtonComponent";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import _ from "lodash";
import ClinicProfile from "./Section/ClinicProfile";
import { ClinicDetail } from "./Section/clinic-details";
import "./style.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "80vh",
  overflowY: "scroll",
};
const DetailClinic = ({ clinic, open, setOpen, updateClinic }) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [province, setProvince] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [detail, setDetail] = useState("");
  const [views, setViews] = useState(0);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [previewLogoUrl, setPreviewLogoUrl] = useState("");
  const [imgUpdate, setImgUpdate] = useState(null);
  const [logoUpdate, setLogoUpdate] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setAddress(clinic?.address?.detail ? clinic.address?.detail : "");
    setImage(clinic?.image ? clinic.image : "");
    setLogo(clinic?.logo ? clinic.logo : "");
    setName(clinic?.name ? clinic.name : "");
    setIntroduce(clinic?.introduce ? clinic.introduce : "");
    setDetail(clinic?.detail ? clinic.detail : "");
    setViews(clinic?.views ? clinic.views : "");
    setCoordinates({
      lat: clinic?.address?.lat ? clinic?.address?.lat : null,
      lng: clinic?.address?.lng ? clinic?.address?.lng : null,
    });
    setProvince(clinic?.address?.province ? clinic.address?.province : "");
  }, [clinic]);
  useEffect(() => {}, []);

  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!address) errors.address = "Địa chỉ không được bỏ trống";
    if (!detail) errors.detail = "Chi tiết không được bỏ trống";
    if (!introduce) errors.introduce = "Mô tả không được bỏ trống";
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
      detail,
      image: previewImgUrl ? previewImgUrl : null,
      logo: previewLogoUrl ? previewLogoUrl : null,
      name,
      introduce,
      address: {
        detail: address,
        province,
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    };
    updateClinic(clinic.id, data);
  };
  const handleClose = () => {
    setOpen(false);
    setAddress({});
    setImage("");
    setLogo("");
    setName("");
    setIntroduce("");
    setDetail("");
    setViews("");
    setPreviewImgUrl("");
    setPreviewLogoUrl("");
    setErrors("");
    setCoordinates({
      lat: null,
      lng: null,
    });
    setProvince("");
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
            <Header title="Chi tiết phòng khám" />
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
                  <Grid xs={12} md={6} lg={4}>
                    <ClinicProfile
                      name={name}
                      address={address}
                      image={image}
                      setImage={setImage}
                      logo={logo}
                      setLogo={setLogo}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      previewLogoUrl={previewLogoUrl}
                      setPreviewLogoUrl={setPreviewLogoUrl}
                      setImgUpdate={setImgUpdate}
                      setLogoUpdate={setLogoUpdate}
                    />
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <ClinicDetail
                      name={name}
                      setName={setName}
                      detail={detail}
                      setDetail={setDetail}
                      introduce={introduce}
                      setIntroduce={setIntroduce}
                      address={address}
                      setAddress={setAddress}
                      errors={errors}
                      setCoordinates={setCoordinates}
                      setProvince={setProvince}
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
                </Grid>
                <Grid display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <ButtonComponent
                    content="Lưu"
                    handleClick={handleSave}
                    bgcolor="#94e2cd"
                    color="#141414"
                    hoverBgColor="#1e5245"
                    hoverColor="#fff"
                  />
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClinic: (id, data) => dispatch(actions.updateClinicAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
