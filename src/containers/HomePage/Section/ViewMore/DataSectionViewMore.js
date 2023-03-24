import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import _ from "lodash";
// import useIsMobile from "../../../components/useScreen/useIsMobile.js";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CardContent,
  Card,
  Typography,
  CardMedia,
  Divider,
} from "@mui/material";

const DataSectionViewMore = ({
  getListSpecialtyHome,
  listSpecialty,
  getListClinicHome,
  listClinic,
}) => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (location.pathname.includes("clinic")) {
      getListClinicHome();
      setTitle("Cơ sở khám bệnh");
    } else {
      getListSpecialtyHome();
      setTitle("Chuyên khoa");
    }
  }, [location]);

  useEffect(() => {
    setData([]);
    if (location.pathname.includes("clinic"))
      setData(
        listClinic.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else
      setData(
        listSpecialty.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
  }, [listSpecialty, listClinic]);

  const clickDetailSpecialty = (id) => {
    if (location.pathname.includes("clinic")) navigate(`/clinic/${id}`);
    else navigate(`/specialty/${id}`);
  };

  const navigate = useNavigate();
  const styles = {
    height: "50px",
    zIndex: 2000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    overflowY: " scroll",
    boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
  };
  return (
    <>
      <Box style={styles} p={2}>
        <Typography
          sx={{ fontSize: 16, cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-long-arrow-alt-left icon-goback"></i>
          <span style={{ fontSize: 16, marginLeft: 5 }}> {title}</span>
        </Typography>
      </Box>
      <Box mt={"50px"}>
        {data &&
          data.length > 0 &&
          data.map((e) => (
            <Card
              key={e.id}
              sx={{
                display: "flex",
                // justifyContent: "flex",
                alignItems: "center",
                p: 2,
                cursor: "pointer",
                borderRadius: 0,
                ":hover": {
                  bgcolor: "#b2ebf2",
                },
              }}
              onClick={() => clickDetailSpecialty(e.id)}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 80,
                  height: 53,
                  //   display: { xs: "none", sm: "block" },
                }}
                image={e.image ? e.image : ""}
                alt={e.name}
              />
              <CardContent>{e.name ? e.name : ""}</CardContent>
              <Divider />
            </Card>
          ))}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.patient.listClinic,
    listSpecialty: state.patient.listSpecialty,
    listUser: state.patient.listUser,
    listHandbook: state.patient.listHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListUserHome: () => dispatch(actions.getListUserHomePatientAction()),
    getAllHandbookHome: () =>
      dispatch(actions.getAllHandbookHomePatientAction()),
    getListClinicHome: () => dispatch(actions.getListClinicHomePatientAction()),
    getListSpecialtyHome: () =>
      dispatch(actions.getListSpecialtyHomePatientAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSectionViewMore);
