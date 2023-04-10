import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Stack, Button } from "@mui/material";
import HomeHeader from "../../HomePage/Section/Header";
import HomeFooter from "../../HomePage/Section/Footer";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import confirmImg from "../../../assets/verified.png";
import { useSearchParams } from "react-router-dom";
import {
  patientUpdateFeedback,
  patientCheckAllowUpdateFeedback,
} from "../../../services/scheduleService";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(3);
  const [allow, setAllow] = useState(false);
  const [searchParams] = useSearchParams();
  let data = {
    doctorId: searchParams.get("doctorId"),
    packetId: searchParams.get("packetId"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
    // rating: value,
    // comment: message,
  };

  useEffect(() => {
    const checkAllowUpdate = async () => {
      const res = await patientCheckAllowUpdateFeedback(data);
      if (res && res.success === false) {
        setAllow(false);
      } else if (res && res.success === true) {
        setAllow(true);
      } else if (!res) {
        toast.error("Đã có lỗi xảy ra");
      }
    };

    checkAllowUpdate();
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClickSent = async () => {
    if (!value) {
      toast.warning("Vui lòng chọn mức độ hài lòng");
      return;
    }
    if (!message) {
      toast.warning("Vui lòng để lại lời nhắn");
      return;
    }
    const dataSent = { ...data, rating: value, comment: message };
    const res = await patientUpdateFeedback(dataSent);
    if (res && res.success) {
      setAllow(true);
      return;
    }
    toast.error("Đã có lỗi xảy ra");
  };

  return (
    <>
      <HomeHeader />
      <Box
        sx={{
          width: "100%",
          height: "77%",
          display: "grid",
          placeItems: "center",
        }}
      >
        {allow === false ? (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              p: 3,
            }}
          >
            <Typography
              color="#00cc00"
              sx={{ fontWeight: "bold", fontSize: { sm: 26, md: 30 } }}
            >
              ĐÃ ĐÁNH GIÁ
            </Typography>
            <CardMedia
              component="img"
              sx={{
                borderRadius: "50%",
                width: { sm: 60, md: 100 },
                height: { sm: 60, md: 100 },
              }}
              image={confirmImg}
              alt={"confirm image"}
            />
          </Stack>
        ) : (
          <Container>
            <Stack spacing={1}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Phản hồi người dùng
              </Typography>
              {/* <Typography variant="subtitle1">
              Chúng tôi rất vui lòng tiếp nhận phản hồi của bạn, xin hãy để lại
              đánh giá.
            </Typography> */}
            </Stack>
            <Stack spacing={1}>
              <Stack
                spacing={1}
                display={"flex"}
                alignItems={"center"}
                direction={"row"}
              >
                <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
                  Mức độ hài lòng:{" "}
                </Typography>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Stack>
              <textarea
                rows="4"
                cols="50"
                //   maxLength={100}
                value={message}
                onChange={handleMessageChange}
                style={{
                  resize: "none",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "10px",
                }}
              />

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ width: "fit-content", marginLeft: "auto !important" }}
                onClick={handleClickSent}
              >
                Gửi
              </Button>
            </Stack>
          </Container>
        )}
      </Box>
      <HomeFooter />
    </>
  );
};

export default Feedback;
