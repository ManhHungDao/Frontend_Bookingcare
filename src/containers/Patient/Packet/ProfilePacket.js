import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Stack, Avatar, Typography, Grid } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import { getSinglePacketSchedule } from "../../../services/scheduleService";
import { getSinglePacket } from "../../../services/packetService";
import ScheduleTime from "../Schedule/ScheduleTime";
import DetailSchuleBooking from "../Schedule/DetailSchuleBooking";
import localization from "moment/locale/vi";
import moment from "moment";

const ProfilePacket = ({ id, language, fetchAllcode, allcodes }) => {
  const [data, setData] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [date, setDate] = useState(
    moment(new Date()).add(1, "days").startOf("day").valueOf()
  );
  const [timeSchedule, setTimeSchedule] = useState([]);

  const getDataSchedule = async () => {
    let res = await getSinglePacketSchedule(id, date / 1000);
    if (res && res.success === true) {
      if (res?.schedule?.schedule && res.schedule.schedule.length > 0) {
        setTimeSchedule(res.schedule.schedule);
      }
      setNote(res?.schedule?.detail?.note);
      setPrice(res?.schedule?.detail?.price);
      setPayment(res?.schedule?.detail?.payment);
    } else {
      setTimeSchedule("");
      setPrice("");
      setNote("");
      setPayment("");
    }
  };

  useEffect(() => {
    getDataSchedule();
  }, [date]);
  // data user booking

  const getDataUser = async () => {
    let res = await getSinglePacket(id);
    if (res && res.success) {
      setData(res.packet);
    } else {
      setData("");
    }
  };

  useEffect(() => {
    getDataUser();
    fetchAllcode();
  }, []);

  const dataToSchedule = {
    idDoctor: null,
    idPacket: id,
    nameData: data?.name,
    imgData: data?.image?.url,
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
        <Stack display="flex" gap={1} direction="row">
          <Avatar
            alt={data?.name ? data.name : ""}
            src={data?.image?.url ? data.image.url : ""}
            sx={{ width: 100, height: 100 }}
          />
          <Stack display={"flex"} gap={1}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <span style={{ textTransform: "capitalize" }}>
                &nbsp; {data?.name ? data.name : ""}
              </span>
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: "0.7" }}>
              {data?.introduce ? data.introduce : ""}
            </Typography>
          </Stack>
        </Stack>
        {/* render time booking */}
        <Grid container spacing={2} display="flex" alignItems={"center"}>
          <Grid item xs={12} md={6}>
            <ScheduleTime
              data={dataToSchedule}
              price={price?.name}
              note={note}
              date={date}
              setDate={setDate}
              allcodes={allcodes}
              timeSchedule={timeSchedule}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailSchuleBooking
              clinic={data?.clinic}
              price={price?.name}
              payment={payment?.name}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePacket);
