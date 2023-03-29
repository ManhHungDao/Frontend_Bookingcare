/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changLanguageApp } from "../../../store/actions";
import {
  Grid,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
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
import InputSelect from "../../../components/Input/InputSelect";

const HomePacket = () => {
  const smsScreen = useIsTablet();
  const mobiScreen = useIsMobile();
  const [age, setAge] = React.useState("");

  const styles = {
    backgroundImage: `url(${bgpacket})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  const handleChange = (event) => {
    setAge(event.target.value);
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
                  endAdornment={
                    <InputAdornment position="end" size="small" >
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
                >
                  <CachedIcon />
                </IconButton>
              )}
            </div>
            <div
              className={`d-flex justify-content-center align-items-center gap-3`}
            >
              <FormControl
                sx={{ m: 1, minWidth: 180, bgcolor: "#fff", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small">Loại gói khám</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Loại gói khám"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 180, bgcolor: "#fff", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small">Phòng khám</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Phòng khám"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              {!mobiScreen && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <CachedIcon />
                </IconButton>
              )}
            </div>
          </Box>
        </div>
      </Stack>
    </>
  );
};

export default HomePacket;
