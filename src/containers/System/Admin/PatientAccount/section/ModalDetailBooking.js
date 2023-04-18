import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Rating,
} from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions";
import { getDetailSchedule } from "../../../../../services/scheduleService";
import dayjs from "dayjs";
import Header from "../../../../../components/Header";

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
const ModalDetailBooking = ({
  open,
  setOpen,
  loadingToggleAction,
  dataFetch,
  allcodeType,
  getSinglePrescription,
  prescription,
}) => {
  const [detailSchedule, setDetailSchedule] = useState("");
  const [detailPrescrtiption, setDetailPrescrtiption] = useState("");

  const fetchDataDetailSchedule = async (id, time) => {
    try {
      loadingToggleAction(true);
      let res = await getDetailSchedule(id, time);
      if (res && res.success) {
        setDetailSchedule(res.schedule);
        getSinglePrescription(res.schedule?.schedule?._id);
        loadingToggleAction(false);
      } else {
        loadingToggleAction(false);
      }
    } catch (error) {
      loadingToggleAction(false);
    }
  };

  useEffect(() => {
    if (open === true) fetchDataDetailSchedule(dataFetch?.id, dataFetch?.time);
  }, [open]);

  useEffect(() => {
    if (prescription) setDetailPrescrtiption(prescription.detail);
    else {
      setDetailPrescrtiption("");
    }
  }, [prescription]);
  const handleOnClose = () => {
    setDetailPrescrtiption("");
    setDetailSchedule("");
    setOpen(false);
  };
  const [doctor] = detailSchedule?.doctor ? detailSchedule?.doctor : [];
  const [packet] = detailSchedule?.packet ? detailSchedule?.packet : [];
  const statusList = [
    { name: "Lịch hẹn mới", color: "#80d8ff" },
    { name: "Chờ xác nhận", color: "#78909c" },
    { name: "Đã xác nhận", color: "#26a69a" },
    { name: "Đang khám", color: "#e6ee9c" },
    { name: "Hoàn thành", color: "#00e676" },
    { name: "Đã hủy", color: "#ff9100" },
  ];
  return (
    <>
      <Modal
        open={open}
        onClose={() => handleOnClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Thông tin khám" />
          <Grid container spacing={2}>
            <Grid item sx={12} md={6}>
              <Card>
                <CardHeader title="Thông tin đăng kí" />
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Bác sĩ:&nbsp;
                      {doctor?.name ? doctor?.name : ""}
                    </Typography>
                    <Typography variant="subtitle1">
                      Gói khám:&nbsp; {packet?.name ? packet?.name : ""}
                    </Typography>{" "}
                    <Typography variant="subtitle1">
                      Cơ sở:&nbsp;
                      {doctor
                        ? doctor?.detail?.clinic?.name
                        : packet?.clinic?.name
                        ? packet?.clinic?.name
                        : ""}
                    </Typography>{" "}
                    <Typography variant="subtitle1">
                      Chuyên khoa:&nbsp;{" "}
                      {doctor
                        ? doctor?.detail?.specialty?.name
                        : packet?.type?.specialty?.name
                        ? packet?.type?.specialty?.name
                        : ""}
                    </Typography>
                    <Typography variant="subtitle1">
                      Thời gian khám:&nbsp;
                      {allcodeType?.list?.length > 0 &&
                        allcodeType.list.map((i) => {
                          if (i._id === dataFetch.time) return i.valueVI;
                        })}
                      &nbsp;-{" "}
                      {dayjs.unix(detailSchedule.date).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="subtitle1">
                      Giá khám : {detailSchedule?.detail?.price?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Phương thức thanh toán :{" "}
                      {detailSchedule?.detail?.payment?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Ghi chú : {detailSchedule?.detail?.note}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={12} md={6}>
              <Card>
                <CardHeader title="Thông tin sau khám" />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack
                      display={"flex"}
                      direction={"row"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Stack>
                        <Typography variant={"subtitle1"}>
                          Trạng thái:
                        </Typography>
                      </Stack>
                      {statusList.map((i) => {
                        if (i.name === detailSchedule?.schedule?.status)
                          return (
                            <>
                              <Box
                                p={1}
                                sx={{
                                  backgroundColor: i.color,
                                  borderRadius: 1,
                                  width: "fit-content",
                                }}
                              >
                                {i.name}
                              </Box>
                            </>
                          );
                      })}
                    </Stack>
                    {detailSchedule?.schedule?.rating && (
                      <>
                        <Stack
                          display={"flex"}
                          gap={1}
                          sx={{
                            flexDirection: { sx: "column", md: "row" },
                          }}
                        >
                          <Typography variant="subtitle1">Đánh giá:</Typography>
                          <Stack display={"flex"} direction={"column"} gap={1}>
                            <Rating
                              value={detailSchedule?.schedule?.rating}
                              readOnly
                            />
                            <textarea
                              rows="4"
                              cols="50"
                              //   maxLength={100}
                              defaultValue={detailSchedule?.schedule?.comment}
                              style={{
                                resize: "none",
                                borderRadius: "4px",
                                outline: "none",
                                padding: "10px",
                              }}
                            />
                          </Stack>
                        </Stack>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            {detailPrescrtiption && (
              <Grid item sx={12} md={12}>
                <Card>
                  <CardHeader title="Đơn thuốc" />
                  <CardContent className="render__prescrtiption">
                    <span
                      className="render__prescrtiption--detail"
                      dangerouslySetInnerHTML={{
                        __html: detailPrescrtiption,
                      }}
                    ></span>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allcodeType: state.client.allcodeType,
    listBookingByEmail: state.patient.listBookingByEmail,
    prescription: state.patient.prescription,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBookingByEmail: (data) =>
      dispatch(actions.getAllBookingByEmailAction(data)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
    getSinglePrescription: (id) =>
      dispatch(actions.getSinglePrescriptionAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailBooking);
