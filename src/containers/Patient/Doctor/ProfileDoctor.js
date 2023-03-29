import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Box,
  Grid,
  Stack,
  Avatar,
  FormControl,
  Typography,
  NativeSelect,
  Divider,
  Link,
} from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import localization from "moment/locale/vi";
import moment from "moment";
import { languages } from "../../../utils";
import _ from "lodash";
import BookingModal from "./Modal/BookingModal";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import { getSingleUserService } from "../../../services/userService";
import { getSingleUserSchedule } from "../../../services/scheduleService";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const ProfileDoctor = ({ id, user, language, fetchAllcode, allcodes }) => {
  const [data, setData] = useState("");
  const [allday, setAllday] = useState([]);
  const [date, setDate] = useState(
    moment(new Date()).add(1, "days").startOf("day").valueOf()
  );
  const [codeTime, setCodeTime] = useState([]);
  const [timeSchedule, setTimeSchedule] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeBooking, setTimeBooking] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [note, setNote] = useState("");
  // data user booking

  const getDataUser = async () => {
    let res = await getSingleUserService(id);
    if (res && res.success) {
      setData(res.user);
    } else {
      setData("");
    }
  };

  useEffect(() => {
    allDay();

    getDataUser();
    fetchAllcode();
  }, []);

  useEffect(() => {
    allDay();
  }, [language]);

  useEffect(() => {
    if (allcodes && allcodes.length > 0) {
      setCodeTime(
        allcodes
          .filter((e) => e.type === "TIME")
          .map((e) => ({
            id: e._id,
            name: e.valueVI,
          }))
      );
    }
  }, [allcodes]);

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  const getDataSchedule = async () => {
    let res = await getSingleUserSchedule(id, date / 1000);
    if (res && res.success) {
      let { schedule } = res?.schedule;
      if (schedule && schedule.length > 0) {
        setTimeSchedule(schedule);
      }
      setNote(res?.schedule?.detail?.note);
    }
  };

  useEffect(() => {
    getDataSchedule();
  }, [date]);

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
    setTimeBooking(time);
    setOpen(true);
  };
  const handleConfirm = () => setOpenConfirm(false);

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
        <Stack display="flex" gap={1} direction="row">
          <Avatar
            alt={data?.name ? data.name : ""}
            src={data?.image?.url ? data.image.url : ""}
            sx={{ width: 100, height: 100 }}
          />
          <Stack display={"flex"} gap={1}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {data?.detail?.position?.name ? data.detail.position.name : ""}
              <span style={{ textTransform: "capitalize" }}>
                &nbsp; {data?.name ? data.name : ""}
              </span>
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: "0.7" }}>
              {data?.detail?.introduce ? data.detail.introduce : ""}
            </Typography>
          </Stack>
        </Stack>
        {/* render time booking */}
        <Stack>
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
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box
                    // sx={{
                    //   display: "grid",
                    //   gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                    //   gap: 1,
                    // }}
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {timeSchedule &&
                      timeSchedule.length > 0 &&
                      timeSchedule.map((e) => (
                        <Box
                          p={1}
                          key={e.id}
                          variant={"contained"}
                          onClick={() => handleClickTime(e.time)}
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
                          {codeTime &&
                            codeTime.length > 0 &&
                            codeTime.map((i) => {
                              if (i.id === e.time) return i.name;
                            })}
                        </Box>
                      ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider />
                  <Typography color="#a94442" variant="subtitle2" p={1}>
                    {note && (
                      <>
                        <LocalFireDepartmentIcon color="#a94442" /> {note}
                      </>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              gap={1}
              direction="column"
              sx={{
                borderLeft: "1px solid #ddd",
              }}
            >
              <Typography>
                <b>
                  Phòng khám:&nbsp;
                  <Link
                    href={`/clinic/${data?.detail?.clinic?.id}`}
                    underline="hover"
                  >
                    {data?.detail?.clinic?.name ? data.detail.clinic.name : ""}
                  </Link>
                </b>
              </Typography>
              <Divider />
              <Box
                sx={{
                  backgroundColor: "#f8f8f8",
                  border: "1px solid #ddd",
                  maxWidth: "fit-content",
                }}
              >
                <Stack
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems="center"
                  direction={"row"}
                >
                  <Typography variant="subtitle2" p={1}>
                    Giá khám
                  </Typography>
                  <Typography variant="subtitle2" p={1}>
                    {data?.detail?.price?.name ? data.detail.price.name : ""}
                  </Typography>
                </Stack>
                <Divider />
                <Typography variant="subtitle2" p={1}>
                  Người bệnh có thể thanh toán chi phí bằng hình thức &nbsp;
                  {data?.detail?.payment?.name ? data.detail.payment.name : ""}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <BookingModal
        open={open}
        setOpen={setOpen}
        image={data?.image?.url ? data.image.url : ""}
        nameDoctor={`${data?.detail?.position?.name} ${data?.name}`}
        timeBooking={timeBooking}
        dateBooking={date / 1000}
        codeTime={codeTime}
        priceBooking={data?.detail?.price?.name}
        doctorId={id}
        setOpenConfirm={setOpenConfirm}
      />
      <ConfirmModal
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Thông báo nhắc nhở"
        content={`Vui lòng để ý điện thoại hoặc email để bộ phận chăm sóc khách hàng có thể liên hệ thông tin đến bạn. Xin cảm ơn`}
        type="CONFIRM"
        confirmFunc={handleConfirm}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
