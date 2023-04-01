import React, { useState, useEffect } from "react";
import Header from "../../../HomePage/Section/Header";
import Skeleton from "@mui/material/Skeleton";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "../../../HomePage/Section/Footer";
import confirmImg from "../../../../assets/verified.png";
import failedImg from "../../../../assets/failed.png";
import { patientConfirmBooking } from "../../../../services/scheduleService";
import { useSearchParams } from "react-router-dom";

const PatientConfirmBooking = () => {
  const [isSucceed, setIsSucceed] = useState("");
  const [searchParams] = useSearchParams();
  const data = {
    doctorId: searchParams.get("doctorId"),
    packetId: searchParams.get("packetId"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
  };
  const conFirmFunc = async () => {
    const res = await patientConfirmBooking(data);
    if (res && res.success) setIsSucceed(true);
    else setIsSucceed(false);
  };

  useEffect(() => {
    conFirmFunc();
  }, []);
  const success = () => {
    return (
      <>
        <Typography color="#00cc00" variant="h2" sx={{ fontWeight: "bold" }}>
          ĐÃ XÁC NHẬN
        </Typography>
        <CardMedia
          component="img"
          sx={{
            borderRadius: "50%",
            width: 100,
            height: 100,
            display: { xs: "none", sm: "block" },
          }}
          image={confirmImg}
          alt={"confirm image"}
        />
      </>
    );
  };
  const failed = () => {
    return (
      <>
        <Typography color="#f34235" variant="h2" sx={{ fontWeight: "bold" }}>
          CÓ LỖI XẢY RA
        </Typography>
        <CardMedia
          component="img"
          sx={{
            borderRadius: "50%",
            width: 100,
            height: 100,
            display: { xs: "none", sm: "block" },
          }}
          image={failedImg}
          alt={"confirm image"}
        />
      </>
    );
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "grid",
        }}
      >
        <Stack
          sx={{
            placeSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          {isSucceed === true && success()}
          {isSucceed === false && failed()}
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default PatientConfirmBooking;
