import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import SelectSpecialtyClinic from "./SelectSpecialtyClinic";
import RenderNote from "./RenderNote";
import RenderDoctocs from "./RenderDoctocs";
import { useParams } from "react-router-dom";
import Footer from "../../HomePage/Section/Footer";
import _ from "lodash";
import { Box, Container, Grid, Stack } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
// import Header from "../../HomePage/Section/Header";
import SubHeader from "../../HomePage/Section/SubHeader";
import { pageViewCount } from "../../../services/clinicService";
import { useLocation } from "react-router-dom";
import { getSingleClinic } from "../../../services/clinicService";
import "./style.scss";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import BackToTop from "../../../components/BackToTop ";
import "./style.scss";

const DetailClinic = ({ language, loadingToggleAction }) => {
  const location = useLocation();
  const [data, setData] = useState({});
  const { id } = useParams();
  const smScreen = useIsMobile();

  const getData = async () => {
    // loadingToggleAction(true);
    const res = await getSingleClinic(id);
    if (res && res.success) {
      setData(res.clinic);
      // loadingToggleAction(false);
    }
    // loadingToggleAction(false);
  };

  useEffect(() => {
    getData();
    pageViewCount(id);
  }, []);

  useEffect(() => {
    setData("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <SubHeader />
      <Box className="render-detail">
        <Stack sx={{ width: "100%", height: smScreen ? "20vh" : "40vh" }}>
          <img
            src={data.image?.url ? data.image?.url : ""}
            alt={data?.name ? data.name : ""}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Stack>
        <Container maxWidth="lg">
          <Box mb="10px">
            <Card
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 160,
                  height: 160,
                  objectFit: "contain",
                  display: { xs: "none", sm: "block" },
                  mb: 2,
                }}
                image={data.logo?.url ? data.logo?.url : ""}
                alt={data?.name ? data.name : ""}
              />
              <CardContent>
                <Stack spacing={3}>
                  <Typography component="h2" variant="h5">
                    {data?.name ? data.name : ""}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {data?.address?.detail ? data?.address?.detail : ""}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <RenderNote curLang={language} />
          <Stack spacing={2}>
            <Box
              sx={{
                backgroundColor: "rgba(212,239,252,1.00)",
                p: 2,
                mt: 2,
                mb: 2,
              }}
            >
              <span
                className="detail"
                dangerouslySetInnerHTML={{ __html: data.introduce }}
              ></span>
            </Box>
          </Stack>
          <Box>
            <span
              className="detail"
              dangerouslySetInnerHTML={{ __html: data.detail }}
            ></span>
          </Box>
          <BackToTop />
        </Container>
      </Box>
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
  return {
    loadingToggleAction: (id) => dispatch(actions.loadingToggleAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
