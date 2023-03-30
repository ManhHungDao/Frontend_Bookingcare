import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Footer from "../../HomePage/Section/Footer";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Stack, Divider } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import SubHeader from "../../HomePage/Section/SubHeader";
import ProfileDoctor from "./ProfileDoctor";
import { getSinglePacket } from "../../../services/packetService";
import "./style.scss";

const DetiailPacket = ({}) => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await getSinglePacket(id);
      if (res && res.success) {
        setData(res.user);
      }
    };
    getData();
  }, []);
  return (
    <>
      <SubHeader />
      <Stack className="introduce-doctor">
        <Container>
          {/* <ProfileDoctor id={id} /> */}
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
            dangerouslySetInnerHTML={{ __html: data?.detail?.detail }}
          ></span>
        </Container>
      </Stack>
      <Divider />
      <Footer />
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
export default connect(mapStateToProps, mapDispatchToProps)(DetiailPacket);
