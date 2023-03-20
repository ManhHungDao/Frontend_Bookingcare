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
}) => {
  const [status, setStatus] = useState();
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const statusList = [
    { name: "Lịch hẹn mới", value: 1 },
    { name: "Đang khám", value: 2 },
    { name: "Hoàn thành", value: 3 },
    { name: "Đã hủy", value: 4 },
  ];
  useEffect(() => {
    setStatus(
      statusList.find((e) => {
        if (data.status === e.name) return e.value;
      })
    );
    setPatient(data.user);
    setTime(data.time);
  }, [data]);

  const handleSave = () => {};
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setStatus(
      statusList.find((e) => {
        if (e.value === event.target.value) return e.value;
      })
    );
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSpecialty: (id, data) =>
      dispatch(actions.updateSpecialtyAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSchedule);
