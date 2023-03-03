import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Modal,
  Button,
  Switch,
} from "@mui/material";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  height: "80vh",
  overflowY: "scroll",
};
const DetailClinic = ({ id, clinic, getSingleClinic }) => {
  const [address, setAddress] = useState({});
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [detail, setDetail] = useState("");
  const [views, setViews] = useState(0);


  const [open, setOpen] = useState(true);

  useEffect(() => {
    getSingleClinic("63edecf817153ce611f5d27c");
  }, []);
  useEffect(() => {
    setAddress(clinic?.address ? clinic?.address : {});
    setImage(clinic?.image ? clinic.image.url : "");
    setLogo(clinic?.logo ? clinic.logo : "");
    setName(clinic?.name ? clinic.name : "");
    setIntroduce(clinic?.introduce ? clinic.introduce : "");
    setDetail(clinic?.detail ? clinic.detail : "");
    setViews(clinic?.views ? clinic.views : "");
  }, [clinic]);
  useEffect(() => {}, []);
  const handleSave = (clinic) => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
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
              // isShowSwitch={true}
              // titleSwich="Chỉnh sửa"
              // isChecked={isChecked}
              // setChecked={setChecked}
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
                  <Grid xs={12} md={6} lg={4}></Grid>
                  <Grid xs={12} md={6} lg={8}></Grid>
                  <Grid xs={12} md={12} lg={12}></Grid>
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
  return {
    clinic: state.admin.clinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleClinic: (id) => dispatch(actions.getSingleClinicAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
