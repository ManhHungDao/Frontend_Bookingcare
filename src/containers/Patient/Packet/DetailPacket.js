import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Footer from "../../HomePage/Section/Footer";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stack,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import SubHeader from "../../HomePage/Section/SubHeader";
import { getSinglePacket } from "../../../services/packetService";
import { getAllPatientByPacket } from "../../../services/scheduleService";
import ProfilePacket from "./ProfilePacket";
import VerifiedIcon from "@mui/icons-material/Verified";
import dayjs from "dayjs";
import BackToTop from "../../../components/BackToTop ";

const DetailPacket = ({}) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [feedback, setFeedback] = useState([]);

  const getDataFeedback = async () => {
    const res = await getAllPatientByPacket(id);
    if (res && res.success) {
      let data = res.patient.map((e) => ({
        date: dayjs.unix(e.date).format("DD/MM/YYYY"),
        name: e.schedule.user.name,
        rating: e.schedule.rating,
        comment: e.schedule.comment,
      }));
      setFeedback(data);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const res = await getSinglePacket(id);
      if (res && res.success) {
        setData(res.packet);
      }
    };
    getData();
    getDataFeedback();
  }, []);
  return (
    <>
      <SubHeader />
      <Stack className="introduce-doctor">
        <Container>
          <ProfilePacket id={id} />
        </Container>
      </Stack>
      <Divider />
      <Stack
        className="detail-doctor"
        sx={{ backgroundColor: "#efefef", p: 2 }}
      >
        <Container>
          <span
            className="detail"
            dangerouslySetInnerHTML={{ __html: data?.detail }}
          ></span>
        </Container>
      </Stack>
      <Divider />
      {feedback.length > 0 && (
        <Stack sx={{ backgroundColor: "#efefef", p: 2 }}>
          <Container>
            <Typography variant="h5" sx={{ fontSize: 18 }}>
              <b>Phản hồi của bệnh nhân sau khi đi khám</b>
            </Typography>
            <Stack mt={2}>
              {feedback.length > 0 &&
                feedback.map((e, i) => {
                  return (
                    <Stack key={i}>
                      <Stack sx={{ padding: "10px 0" }}>
                        <Stack display={"flex"} direction={"row"}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: 12,
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            {e.name}
                          </Typography>
                          <Typography
                            color="primary"
                            variant="h5"
                            sx={{ fontSize: 12 }}
                          >
                            &nbsp; - <VerifiedIcon sx={{ fontSize: 12 }} /> Đã
                            khám ngày&nbsp;
                            {e.date}
                          </Typography>
                        </Stack>
                        <Rating
                          name="simple-controlled"
                          readOnly
                          value={e.rating}
                          size="small"
                        />
                        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                          {e.comment}
                        </Typography>
                      </Stack>
                      <Divider sx={{ color: "#ddd" }} />
                    </Stack>
                  );
                })}
            </Stack>
          </Container>
        </Stack>
      )}
      <Divider />
      <Footer />
      <BackToTop />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPacket);
