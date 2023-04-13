import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
} from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Header from "../../../../components/Header";
import _ from "lodash";
import {
  ScheduleProfile,
  DetailExam,
  PatientProfile,
} from "./section/DetailProfile";
import { getDetailSchedule } from "../../../../services/scheduleService";
import dayjs from "dayjs";

const DetailBooking = ({
  open,
  setOpen,
  id,
  time,
  textTime,
  updateStatusSchedule,
  loadingToggleAction,
}) => {
  const [status, setStatus] = useState();
  const [detailSchedule, setDetailSchedule] = useState("");

  const fetchDataDetailSchedule = async (id, time) => {
    try {
      loadingToggleAction(true);
      let res = await getDetailSchedule(id, time);
      if (res && res.success) {
        setDetailSchedule(res.schedule);
        setStatus(res.schedule.schedule.status);
        loadingToggleAction(false);
        // foarmat data to component
      } else {
        loadingToggleAction(false);
      }
    } catch (error) {
      loadingToggleAction(false);
    }
  };
  useEffect(() => {
    fetchDataDetailSchedule(id, time);
  }, [id, time]);

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "fit-content",
    maxHeight: "80vh",
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: 0,
    right: 0,
  };

  const handleUploadStatus = () => {
    const [doctor] = detailSchedule.doctor;
    const [packet] = detailSchedule.packet;
    let dataSend = {
      status: _.isArray(status) ? status[0] : status,
      date: detailSchedule.date,
      time: time,
      doctorId: doctor?._id ? doctor?._id : null,
      packetId: packet?._id ? packet?._id : null,
    };
    updateStatusSchedule(dataSend);
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
              {detailSchedule && (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <PatientProfile data={detailSchedule} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <DetailExam data={detailSchedule} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <ScheduleProfile
                        status={status}
                        time={textTime}
                        setStatus={setStatus}
                        handleSave={handleUploadStatus}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
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
    sentMail: (data) => dispatch(actions.sentMailAction(data)),
    updateStatusSchedule: (data) =>
      dispatch(actions.updateStatusScheduleAction(data)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBooking);
