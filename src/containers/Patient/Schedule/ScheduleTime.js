import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Box,
  Grid,
  FormControl,
  Typography,
  NativeSelect,
  Divider,
} from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import localization from "moment/locale/vi";
import moment from "moment";
import { languages } from "../../../utils";
import _ from "lodash";
import BookingModal from "../Schedule/Booking/BookingModal";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import { getSingleUserSchedule } from "../../../services/scheduleService";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { toast } from "react-toastify";
import ModalRequiredLogin from "./Booking/ModalRequiredLogin";

const ScheduleTime = ({
  language,
  allcodes,
  data,
  price,
  note,
  date,
  setDate,
  isLoggedIn,
  setReLoad,
  timeSchedule,
}) => {
  const [allday, setAllday] = useState([]);
  const [codeTime, setCodeTime] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeBooking, setTimeBooking] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openRequied, setOpenRequied] = useState(false);

  useEffect(() => {
    allDay();
  }, []);

  useEffect(() => {
    // reset list time
    if (codeTime.length <= 0) return;
    setCodeTime(
      codeTime.map((e) => ({
        id: e.id,
        name: e.name,
        show: false,
      }))
    );
  }, [timeSchedule]);

  useEffect(() => {
    setCodeTime(
      allcodes
        .filter((e) => e.type === "TIME")
        .map((e) => ({
          id: e._id,
          name: e.valueVI,
        }))
    );
  }, [allcodes]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const allDay = () => {
    let allDays = [];
    for (let i = 1; i < 8; i++) {
      let object = {};
      if (language === languages.VI) {
        const name = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.name = capitalizeFirstLetter(name);
      } else {
        if (i === 0) {
          const ddMM = moment(new Date()).format("DD/MM");
          const name = "Today - " + ddMM;
          object.name = name;
        } else {
          object.name = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    setAllday(allDays);
  };

  const handleClickTime = (time) => {
    if (isLoggedIn === false) {
      setOpenRequied(true);
      return;
    }
    setTimeBooking(time);
    setOpen(true);
  };
  const handleConfirm = () => setOpenConfirm(false);
  const dataBooking = {
    doctorId: data.idDoctor,
    packetId: data.idPacket,
    timeBooking: timeBooking,
    dateBooking: date / 1000,
    // lấy data từ booking
    priceDoctor: price,
    nameData: data.nameData,
    imgData: data.imgData,
    clinic: data.clinic,
    specialty: data.specialty,
  };

  return (
    <>
      <Box
        m="10px 0"
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
        }}
      >
        {/* render time booking */}
        <FormControl sx={{ width: "fit-content" }}>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            sx={{ color: "#1976d2", fontWeight: 600 }}
            onChange={(event) => setDate(event.target.value)}
          >
            {allday &&
              allday.length > 0 &&
              allday.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.name}
                </option>
              ))}
          </NativeSelect>
        </FormControl>
        <Typography variant="body2" mt={1} mb={1}>
          <CalendarMonthRoundedIcon />
          &nbsp;Lịch khám
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {timeSchedule.length > 0 &&
                codeTime.length > 0 &&
                codeTime.map((e) => {
                  timeSchedule.map((i) => {
                    if (i.time === e.id) e.show = true;
                    return e;
                  });
                  if (e.show === true)
                    return (
                      <>
                        <Box
                          p={1}
                          key={e.id}
                          variant={"contained"}
                          onClick={() => handleClickTime(e.id)}
                          sx={{
                            backgroundColor: "#ffeb3b",
                            ":hover": {
                              bgcolor: "rgb(151, 200, 240)",
                            },
                            borderRadius: "4px",
                            textAlign: "center",
                            minWidth: "100px",
                            cursor: "pointer",
                          }}
                        >
                          {e.name}
                        </Box>
                      </>
                    );
                })}
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            {timeSchedule && note && <Divider />}
            <Typography color="#a94442" variant="subtitle2" p={1}>
              {note && (
                <>
                  <LocalFireDepartmentIcon color="#a94442" /> {note}
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <BookingModal
        open={open}
        setOpen={setOpen}
        // data lấy từ user
        codeTime={codeTime}
        dataBooking={dataBooking}
        setOpenConfirm={setOpenConfirm}
        setReLoad={setReLoad}
      />
      <ConfirmModal
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Thông báo nhắc nhở"
        content={`Vui lòng xác nhận lịch khám thông qua trang quản lí cá nhân của bạn. Xin cảm ơn`}
        type="CONFIRM"
        confirmFunc={handleConfirm}
        isShowTitle={false}
      />
      <ModalRequiredLogin open={openRequied} setOpen={setOpenRequied} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.patient.isPatientLoggedIn,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTime);
