/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changLanguageApp } from "../../../store/actions";
import { Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useIsTablet from "../../../components/useScreen/useIsTablet.js";
import SwipeableTemporaryDrawer from "./LeftBar";

const HomeHeader = ({ changLanguageAppRedux, language }) => {
  const smScreen = useIsTablet();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const changeLanguage = (language) => {
    changLanguageAppRedux(language);
  };
  const returnHome = () => {
    navigate(`/`);
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="home-header-container d-flex align-items-center">
        <div className="container">
          <Grid
            container
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <i
                className="fas fa-bars menu-mobile"
                style={{ fontSize: 20, zIndex: 100000 }}
                onClick={handleClick}
              ></i>

              <div
                className="header-logo"
                style={{ cursor: "pointer" }}
                onClick={returnHome}
              ></div>
            </Grid>
            {!smScreen && (
              <Grid
                className="header-bar"
                item
                md={6}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <div
                  className="child-content"
                  onClick={() => {
                    navigate(`/viewmore/specialty`);
                  }}
                  style={{
                    ":hover": {
                      bgcolor: "rgb(151, 200, 240)",
                    },
                  }}
                >
                  <div>
                    <b className="header-title">
                      <FormattedMessage id="home-header.specialty" />
                    </b>
                  </div>
                  <span className="subs-title">
                    <FormattedMessage id="home-header.search-doctor" />
                  </span>
                </div>
                <div
                  className="child-content"
                  onClick={() => {
                    navigate(`/viewmore/clinic`);
                  }}
                >
                  <div>
                    <b className="header-title">
                      <FormattedMessage id="home-header.health-facility" />
                    </b>
                  </div>
                  <span className="subs-title">
                    <FormattedMessage id="home-header.select-room" />
                  </span>
                </div>
                <div
                  className="child-content"
                  onClick={() => {
                    navigate(`/viewmore/doctor`);
                  }}
                >
                  <div>
                    <b className="header-title">
                      <FormattedMessage id="home-header.doctor" />
                    </b>
                  </div>
                  <span className="subs-title">
                    <FormattedMessage id="home-header.select-doctor" />
                  </span>
                </div>
                <div
                  className="child-content"
                  onClick={() => {
                    navigate(`/packet`);
                  }}
                >
                  <div>
                    <b className="header-title">
                      <FormattedMessage id="home-header.fee" />
                    </b>
                  </div>
                  <span className="subs-title">
                    <FormattedMessage id="home-header.check-health" />
                  </span>
                </div>
              </Grid>
            )}
            {/* <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-end"}
              sx={{
                fontWeight: "bold",
                gap: "10px",
              }}
            >
              <div
                className={
                  language === languages.VI ? "lang-vi active" : "lang-vi"
                }
              >
                <span onClick={() => changeLanguage(languages.VI)}>VN</span>
              </div>
              <div
                className={
                  language === languages.EN ? "lang-en active" : "lang-en"
                }
              >
                <span onClick={() => changeLanguage(languages.EN)}>EN</span>
              </div>
            </Grid> */}
          </Grid>
        </div>
      </div>
      <SwipeableTemporaryDrawer direction="left" show={open} setOpen={setOpen} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
