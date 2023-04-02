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
  Pagination,
} from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import Select from "react-select";
import SubHeader from "../../HomePage/Section/SubHeader";
import "./DetailSpecialty.scss";
import { getSingleSpecialty } from "../../../services/specialtySerivce";
import { getAllUserBySpecialtyHome } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";

const DetailSpecialty = ({
  specialty,
  // getSingleSpecialty,
  fetchProvinceCode,
  provinceCode,
  loadingToggleAction,
}) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [selectProvince, setSelectProvince] = useState("");
  const [idSpecialty, setIdSpecialty] = useState("");
  const [size, setSize] = useState(4);
  const [page, setPage] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [count, setCount] = useState(1);

  const getDataSpecialty = async () => {
    try {
      loadingToggleAction(true);
      let res = await getSingleSpecialty(id);
      if (res && res.success) {
        let idSpecialty = res.specialty.key;
        setData(res.specialty);
        setIdSpecialty(idSpecialty);
        // gọi lấy data bác sĩ

        let resSpe = await getAllUserBySpecialtyHome({
          page,
          size,
          id: idSpecialty,
        });
        if (resSpe && resSpe.success) {
          setDoctors(
            resSpe.users.map((e) => ({
              id: e._id,
            }))
          );
          setCount(resSpe.count);
        }
      }
      loadingToggleAction(false);
    } catch (error) {
      loadingToggleAction(false);
      console.log("🚀 ~ error:", error);
    }
  };

  const getDataDocTor = async (page, size) => {
    loadingToggleAction(true);
    let res = await getAllUserBySpecialtyHome({ page, size, id: idSpecialty });
    if (res && res.success) {
      setDoctors(
        res.users.map((e) => ({
          id: e._id,
        }))
      );
      setCount(res.count);
    }
    loadingToggleAction(false);
  };

  useEffect(() => {
    getDataSpecialty();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getDataDocTor(newPage, size);
  };

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
            <Stack mt={1} sx={{ width: 120, maxWidth: 180 }}>
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
            <Box m={0}>
              {doctors &&
                doctors.map((e, i) => (
                  <div
                    key={e + i + ""}
                    style={{
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      margin: "10px 0",
                      paddingBottom: 0,
                    }}
                  >
                    <Stack
                      sx={{
                        marginLeft: { sm: 0, lg: "140px" },
                      }}
                    >
                      <ProfileDoctor id={e.id} />
                    </Stack>
                  </div>
                ))}
            </Box>
            <Stack>
              <span className="d-flex justify-content-center mb-3">
                <Pagination
                  count={Math.ceil(count / 4)}
                  color="primary"
                  onChange={handleChangePage}
                  defaultPage={page}
                />
              </span>
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
    loadingToggleAction: (id) => dispatch(actions.loadingToggleAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
