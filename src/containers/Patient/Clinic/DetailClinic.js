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
// import RenderMenuBar from "./RenderMenuBar";

const DetailClinic = ({ clinic, getSingleClinic }) => {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id && _.isEmpty(clinic)) {
      getSingleClinic(id);
    }
    setData(clinic);
  }, [clinic]);
  return <div>DetailClinic</div>;
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
