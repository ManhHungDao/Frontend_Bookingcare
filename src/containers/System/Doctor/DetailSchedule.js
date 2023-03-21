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
  date,
}) => {
  const [status, setStatus] = useState();
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");

  let mailCancel = `<h2 style="text-align:center;"><strong>THÔNG TIN HỦY LỊCH KHÁM</strong></h2><p>Xin chào ${patient?.name ? patient.name : ""},</p><p>Chúng tôi rất lấy làm tiếc khi phải thông báo đến bạn lịch khám vào lúc ${time ? time : ""} ngày ${date ? date : ""} đã bị hủy vì một số lý do nhất định.</p><p>Mong bạn có thể lựa chọn một lịch khám mới phù hợp hơn.</p><p>Xin cảm ơn.</p><p>&nbsp;</p>`;

  let mailDrescription = `<h2 style="text-align:center;"><strong>THÔNG TIN ĐƠN THUỐC</strong></h2><p>Xin chào  ${patient?.name ? patient.name : ""},</p><p>Cảm ơn bạn đã sử dụng dịch vụ khám bệnh tại đơn vị chúng tôi.</p><p>Sau đây là đơn thuốc của bạn</p><figure class="table" style="width:98.65%;"><table class="ck-table-resized"><colgroup><col style="width:38.11%;"><col style="width:12.08%;"><col style="width:49.81%;"></colgroup><tbody><tr><td>Tên thuốc</td><td>Số lượng</td><td>Liều dùng</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p>Xin cảm ơn.</p>`;
  useEffect(() => {
    setStatus(data.status);
    setPatient(data.user);
    let time = dataTime.find((e) => e._id === data.time);
    setTime(time?.valueVI);
  }, [data]);

  useEffect(() => {
    if (isSuccess && isSuccess === true) {
      setTitle("");
      setContent("");
      clearStatus();
      setOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (title) {
      if (title[0] === "Thông tin hủy lịch") setContent(mailCancel);
      else {
        setContent(mailDrescription);
      }
    }
  }, [title]);

  const handleClose = () => {
    setOpen(false);
    setErrors("");
    setTitle("");
    setContent("");
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
      // to: patient?.email : patient.email : '',
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
