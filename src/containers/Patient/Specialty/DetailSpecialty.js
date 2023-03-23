import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Footer from "../../HomePage/Section/Footer";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Stack, Divider } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import Select from "react-select";
import SubHeader from "../../HomePage/Section/SubHeader";
import "./DetailSpecialty.scss";

const DetailSpecialty = ({
  specialty,
  getSingleSpecialty,
  fetchProvinceCode,
  provinceCode,
}) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [selectProvince, setSelectProvince] = useState("");

  useEffect(() => {
    if (id) getSingleSpecialty(id);
    const data = {
      page: 1,
      size: 9999,
      filter: "PROVINCE",
    };
    fetchProvinceCode(data);
  }, []);

  // useEffect(() => {

  // }, [selectProvince]);

  useEffect(() => {
    let list = [{ value: "All", label: "Toàn quốc" }];
    if (provinceCode.list && provinceCode.list.length > 0) {
      list = [
        ...list,
        ...provinceCode.list.map((e) => ({ value: e._id, label: e.valueVI })),
      ];
    }
    setListProvince(list);
    if (!_.isEmpty(specialty)) setData(specialty);
  }, [provinceCode, specialty]);

  const styles = {
    backgroundImage: `url(${specialty?.image?.url ? specialty.image.url : ""})`,
  backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  return (
    <>
      <SubHeader />
      <Stack className="detail-specialty">
        <Stack style={styles}>
          <div className="detail-specialty-opacity">
            <Container className="detail-specialty--detail">
              <span
                className="detail"
                dangerouslySetInnerHTML={{ __html: data.detail }}
              ></span>
            </Container>
          </div>
        </Stack>
        <Stack sx={{ backgroundColor: "#eee" }}>
          <Container>
            <Stack mt={1} mb={2} sx={{ width: 120, maxWidth: 180 }}>
              <Select
                value={selectProvince}
                onChange={setSelectProvince}
                options={listProvince}
                placeholder="Toàn quốc"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </Stack>
         
          </Container>
        </Stack>
      </Stack>
      <Divider />
      <Footer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    specialty: state.patient.specialty,
    provinceCode: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleSpecialty: (id) =>
      dispatch(actions.getSingleSpecialtyPatientAction(id)),
    fetchProvinceCode: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
