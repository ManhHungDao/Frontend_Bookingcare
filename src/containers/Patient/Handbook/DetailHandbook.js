import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DetailHandbook.scss";
import { toast } from "react-toastify";
// import ListNameHandbook from "./ListNameHandbook";
// import RelatedHandbook from "./RelatedHandbook";
import { getDetailHandbook } from "../../../services/userService";
import Footer from "../../HomePage/Section/Footer";
import SubHeader from "../../HomePage/Section/SubHeader";
import { useParams } from "react-router-dom";
import useIsTablet from "../../../components/useScreen/useIsTablet";
import BackToTop from "../../../components/BackToTop ";
import {
  Box,
  Container,
  Grid,
  Stack,
  Divider,
  Typography,
} from "@mui/material";

const DetailHandbook = ({ getSingleHandbook, handbook }) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const smsScreen = useIsTablet();
  useEffect(() => {
    getSingleHandbook(id);
  }, []);

  useEffect(() => {
    if (handbook) {
      setData(handbook);
    }
  }, [handbook]);

  const styles = {
    backgroundImage: `url(${data?.image?.url ? data.image.url : ""})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  return (
    <>
      <SubHeader />
      {!smsScreen && (
        <Stack style={styles}>
          <div
            className="detail-handbook-opacity d-flex justify-content-center align-items-center"
            style={{ height: 300 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "rgb(255, 255, 255)",
                textShadow: `3px 4px 7px rgba(81,67,21,0.8)`,
              }}
            >
              <b>{data?.name ? data.name : ""}</b>
            </Typography>
          </div>
        </Stack>
      )}
      <Stack className="detail-handbook" sx={{ backgroundColor: "#efefef" }}>
        <Container
          className="detail-handbook--detail"
          sx={{ backgroundColor: "#fff" }}
        >
          <span
            className="detail"
            dangerouslySetInnerHTML={{ __html: data?.note }}
          ></span>
          <Box sx={{ backgroundColor: "rgba(212,239,252,1.00)" }} p={2}>
            <i>
              BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
              Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy
              tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản
              phẩm y tế chất lượng cao.
            </i>
          </Box>
          <span
            className="detail"
            dangerouslySetInnerHTML={{ __html: data?.detail }}
          ></span>
         {/*  bài viết liên quan */}
         
        </Container>
      </Stack>
      <Divider />
      <Footer />
      <BackToTop/>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    handbook: state.patient.handbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleHandbook: (id) => dispatch(actions.getSingleHandbookAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
