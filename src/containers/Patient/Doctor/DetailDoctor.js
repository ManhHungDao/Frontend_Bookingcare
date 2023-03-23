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
const DetailDoctor = ({ getSingleUser, user }) => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    if (id) getSingleUser(id);
  }, []);

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  return (
    <>
      <SubHeader />
      <Stack className="introduce-doctor">
        <Container>
          <ProfileDoctor id={id} />
        </Container>
      </Stack>
      <Divider />
      <Stack className="detail-doctor" sx={{ backgroundColor: "#efefef" }}>
        <Container className="detail-doctor--detail">
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
    user: state.admin.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleUser: (id) => dispatch(actions.getSingleUserAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
