import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import SubHeader from "../../HomePage/SubHeader";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import SelectSpecialtyClinic from "./SelectSpecialtyClinic";
import RenderNote from "./RenderNote";
import RenderDoctocs from "./RenderDoctocs";
import { useParams } from "react-router-dom";
import Footer from "../../HomePage/Section/Footer";
import _ from "lodash";
import { Box, Container, Grid, Stack } from "@mui/material";
// import RenderMenuBar from "./RenderMenuBar";
import { pageViewCount } from "../../../services/clinicService";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import BackToTop from "../../../components/BackToTop ";
import "./style.scss";

const DetailClinic = ({ clinic, getSingleClinic, language }) => {
  const [data, setData] = useState({});
  const [viewMore, setViewMore] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id && _.isEmpty(clinic)) {
      getSingleClinic(id);
      pageViewCount(id);
    }
    setData(clinic);
  }, [clinic]);
  return (
    <>
      <Box className="render-detail">
        <Stack sx={{ width: "100%", height: "40vh" }}>
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
              <span className="detail" dangerouslySetInnerHTML={{ __html: data.introduce }}></span>
            </Box>
          </Stack>
          <Box>
            <span className="detail" dangerouslySetInnerHTML={{ __html: data.detail }}></span>
          </Box>
        </Container>
      </Box>
      <BackToTop />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    clinic: state.patient.clinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleClinic: (id) => dispatch(actions.getSingleClinicPatientAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
