/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Grid,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Divider,
} from "@mui/material";
import * as actions from "../../../store/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HomeHeader from "../../HomePage/Section/Header";
import bgpacket from "../../../assets/bg-packet.jpg";
import useIsTablet from "../../../components/useScreen/useIsTablet";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import Footer from "../../HomePage/Section/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePacket.scss";

const HomePacket = ({
  listClinic,
  getListClinicHome,
  fetchTypePacketCode,
  typePacket,
  listPacket,
  getAllPacket,
}) => {
  const smsScreen = useIsTablet();
  const mobiScreen = useIsMobile();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [packets, setPackets] = useState("");
  const [clinics, setClinics] = useState([]);
  const [typePackets, setTypePackets] = useState("");
  const [filterClinic, setFilterClinic] = useState("");
  const [filterPacker, setFilterPacker] = useState("");

  useEffect(() => {
    getListClinicHome();
    const dateFetchClinic = {
      page: 1,
      size: 10,
      filter: "PACKET",
    };
    fetchTypePacketCode(dateFetchClinic);
    const dateFetchPacket = {
      page: 1,
      size: 8,
      filter: "",
      clinicId: "",
    };
    getAllPacket(dateFetchPacket);
  }, []);

  useEffect(() => {
    setClinics(
      listClinic.map((e) => ({
        value: e._id,
        name: e.name,
        image: e.image.url,
      }))
    );
    setTypePackets(
      typePacket?.list?.map((e) => ({
        value: e._id,
        name: e.valueVI,
      }))
    );
    setPackets(
      listPacket?.list?.map((e) => ({
        id: e._id,
        name: e.name || "",
        image: e.image.url || "",
        price: e.price.name || "",
      }))
    );
  }, [listClinic, typePacket, listPacket]);
  const handleClickReset = () => {
    setFilterClinic("");
    setFilterPacker("");
    setSearch("");
  };
  const handleChange = (event, type) => {
    const {
      target: { value },
    } = event;
    if (type === "clinic")
      setFilterClinic(typeof value === "string" ? value.split(",") : value);
    else setFilterPacker(typeof value === "string" ? value.split(",") : value);
  };
  const handleClickDetailClinic = (id) => {
    navigate(`/clinic/${id}`);
  };
  const handleClickViewMoreClinic = () => {
    navigate("/viewmore/clinic");
  };
  const styles = {
    backgroundImage: `url(${bgpacket})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settingSlidePacket = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <HomeHeader />
      <Stack style={styles}>
        <div
          className="detail-handbook-opacity d-flex flex-column justify-content-center align-items-center"
          style={{
            height: smsScreen ? 200 : 500,
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "rgb(255, 255, 255)",
              textShadow: `3px 4px 7px rgba(81,67,21,0.8)`,
            }}
          >
            <b>GÓI KHÁM TỔNG HỢP</b>
          </Typography>
          <Box
            sx={{
              bgcolor: "#ffeb3b",
              height: "fit-content",
              width: smsScreen ? "100%" : "50%",
              boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
              position: "absolute",
              top: smsScreen ? 200 : 410,
              padding: "20px 30px",
            }}
          >
            <div className="mb-3 d-flex align-items-center">
              <FormControl
                fullWidth
                variant="standard"
                sx={{
                  width: mobiScreen ? "85%" : "100%",
                }}
              >
                <OutlinedInput
                  size="small"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                  }}
                  placeholder="TÌm kiếm tên gói khám"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  endAdornment={
                    <InputAdornment position="end" size="small">
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#ebebeb",
                          color: "#000",
                          textTransform: "capitalize",
                          padding: "3px 5px",
                        }}
                      >
                        Tìm kiếm
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {mobiScreen && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    marginLeft: 2,
                  }}
                  onClick={handleClickReset}
                >
                  <CachedIcon />
                </IconButton>
              )}
            </div>
            <Stack
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction={"row"}
              gap={1}
            >
              <FormControl
                sx={{
                  minWidth: 160,
                  bgcolor: "#fff",
                  borderRadius: 2,
                }}
                size="small"
              >
                <InputLabel id="demo-select-small">Loại gói khám</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterPacker}
                  label="Loại gói khám"
                  onChange={(e) => handleChange(e, "packet")}
                >
                  {typePackets &&
                    typePackets.length > 0 &&
                    typePackets.map((e) => (
                      <MenuItem key={e.value || ""} value={e.value || ""}>
                        {e.name || ""}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{ minWidth: 160, bgcolor: "#fff", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small">Phòng khám</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterClinic}
                  label="Phòng khám"
                  onChange={(e) => handleChange(e, "clinic")}
                >
                  {clinics &&
                    clinics.length > 0 &&
                    clinics.map((e) => (
                      <MenuItem key={e.value || ""} value={e.value || ""}>
                        {e.name || ""}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {!mobiScreen && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickReset}
                >
                  <CachedIcon />
                </IconButton>
              )}
            </Stack>
          </Box>
        </div>
      </Stack>
      <Box
        sx={{
          mt: { xs: 20, sm: 20, md: 11 },
        }}
      >
        <Container>
          {!mobiScreen && (
            <div
              className="section-data homepacket__packet"
              style={{ border: "none", padding: 0 }}
            >
              <div className="container__header d-flex justify-content-between align-items-center mb-2">
                <div className="container__header--title">Gói nổi bật</div>
                <div
                  className="container__header--btn"
                  //   onClick={() => handleClickViewMore()}
                >
                  <FormattedMessage id="homepage.more-info" />
                </div>
              </div>
              <Divider />
              <div className="container__body mt-5">
                {packets &&
                  packets.length > 0 &&
                  packets.map((e, index) => (
                    <div
                      className="container__body--item"
                      //   onClick={() => handleClickDetailPacket(e.id)}
                    >
                      <img src={e.image} alt={e.name} />
                      <div className="container__body--item--title">
                        {e.name}
                      </div>
                      <div className="container__body--item--price">
                        <span>Giá:</span> <span>{e.price}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {mobiScreen && (
            <div
              className="section-data homepacket__clinic mt-5"
              style={{ borderTop: "none", padding: 0, backgroundColor: "#fff" }}
            >
              <div className="container__header d-flex justify-content-between align-items-center mb-2">
                <div className="container__header--title">Gói nổi bật</div>
                <div
                  className="container__header--btn"
                  //   onClick={() => handleClickViewMoreClinic()}
                >
                  <FormattedMessage id="homepage.more-info" />
                </div>
              </div>
              <Divider />
              <div className="container__body mt-5">
                <Slider {...settings}>
                  {packets &&
                    packets.length > 0 &&
                    packets.map((e, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <div
                          className="container__body--item"
                          //   onClick={() => handleClickDetailClinic(e.value)}
                        >
                          <img src={e.image} alt={e.name} />
                          <div className="container__body--item--title">
                            {e.name}
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          )}
          {/* phân chia gói khám và cơ sở y tế */}
          <div
            className="section-data homepacket__clinic mt-5"
            style={{ borderTop: "none", padding: 0, backgroundColor: "#fff" }}
          >
            <div className="container__header d-flex justify-content-between align-items-center mb-2">
              <div className="container__header--title">Cơ sở y tế</div>
              <div
                className="container__header--btn"
                onClick={() => handleClickViewMoreClinic()}
              >
                <FormattedMessage id="homepage.more-info" />
              </div>
            </div>
            <Divider />
            <div className="container__body mt-5">
              <Slider {...settings}>
                {clinics &&
                  clinics.length > 0 &&
                  clinics.map((e, index) => (
                    <div key={index} className="d-flex justify-content-center">
                      <div
                        className="container__body--item"
                        onClick={() => handleClickDetailClinic(e.value)}
                      >
                        <img src={e.image} alt={e.name} />
                        <div className="container__body--item--title">
                          {e.name}
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listPacket: state.patient.listPacket,
    listClinic: state.patient.listClinic,
    typePacket: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHomePatientAction()),
    fetchTypePacketCode: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
    getAllPacket: (data) =>
      dispatch(actions.getAllPacketPatientHomeAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePacket);
