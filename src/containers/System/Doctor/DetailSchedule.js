import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
} from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";
import {
  PatientProfile,
  ScheduleProfile,
  ResponseDetail,
} from "./section/DetailProfile";

const DetailSchedule = ({
  open,
  setOpen,
  isSuccess,
  clearStatus,
  data,
  dataTime,
  sentMail,
}) => {
  const [status, setStatus] = useState();
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");
  useEffect(() => {
    setStatus(data.status);
    setPatient(data.user);
    setTime(data.time);
  }, [data]);

  useEffect(() => {
    if (isSuccess && isSuccess === true) {
      setTitle("");
      setContent("");
      clearStatus();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
    setErrors("");
  };
  const style = {
    position: "absolute",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "80vh",
    maxHeight: "80vh",
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: 0,
    right: 0,
  };
  const checkValidate = () => {
    let errors = {};
    if (!title) errors.title = "Chưa chọn tiêu đề thư";
    if (!content) errors.content = "Chưa có nội dung thư";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  const handleUploadStatus = () => {};
  const handleSendMail = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    const data = {
      to: "hungpepi2001@gmail.com",
      subject: title[0],
      html: content,
    };
    sentMail(data);
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
            <Header title="Chi tiết lịch khám" />
          </Box>

          <Container maxWidth="lg">
            <Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <PatientProfile
                    patient={patient}
                    status={status}
                    time={time}
                    dataTime={dataTime}
                    setStatus={setStatus}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container>
                    <Grid xs={12} md={12} lg={12} p={0}>
                      <ScheduleProfile
                        status={status}
                        time={time}
                        dataTime={dataTime}
                        setStatus={setStatus}
                        handleSave={handleUploadStatus}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  <ResponseDetail
                    status={status}
                    time={time}
                    dataTime={dataTime}
                    setStatus={setStatus}
                    content={content}
                    setContent={setContent}
                    handleSave={handleSendMail}
                    title={title}
                    setTitle={setTitle}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Container>
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
    updateSpecialty: (id, data) =>
      dispatch(actions.updateSpecialtyAction(id, data)),
    sentMail: (data) => dispatch(actions.sentMailAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSchedule);
