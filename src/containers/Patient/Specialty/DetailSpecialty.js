import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Footer from "../../HomePage/Section/Footer";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Stack } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import Select from "react-select";
import SubHeader from "../../HomePage/Section/SubHeader";

const DetailSpecialty = ({ specialty, getSingleSpecialty }) => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    if (id) getSingleSpecialty(id);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(specialty)) setData(specialty);
  }, [specialty]);
  return (
    <>
    <SubHeader/>
      <Stack className="detail-specialty">
        <Container sx={{ pt: 3 }}>
          <span
            className="detail"
            dangerouslySetInnerHTML={{ __html: data.detail }}
          ></span>
        </Container>
        <Stack sx={{ backgroundColor: "#eee" }}>
          <Container>
            <Stack mt={1} mb={2}>
              <Select />
            </Stack>
            <span
              className="detail"
              dangerouslySetInnerHTML={{ __html: data.detail }}
            ></span>
          </Container>
        </Stack>
      </Stack>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    specialty: state.patient.specialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleSpecialty: (id) =>
      dispatch(actions.getSingleSpecialtyPatientAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
