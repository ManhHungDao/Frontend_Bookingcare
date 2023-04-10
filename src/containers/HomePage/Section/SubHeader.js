/* eslint-disable default-case */
import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changLanguageApp } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Grid, Divider, Box } from "@mui/material";
import SwipeableTemporaryDrawer from "../Section/LeftBar";

const SubHeader = ({ language, changLanguageAppRedux }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const changeLanguage = (language) => {
    changLanguageAppRedux(language);
  };

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Box sx={{ backgroundColor: "#45c3d2" }} className="sub-header">
        <Container>
          <Grid
            container
            sx={{ padding: "10px 2px" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sm={6} md={6}>
              <i
                className="fas fa-long-arrow-alt-left icon-goback"
                onClick={() => navigate(-1)}
              ></i>
            </Grid>
            <Grid item sm={6} md={6}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                className="select-container"
              >
                {/* <div className="d-flex justify-content-center gap-2 change-lang">
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
                </div> */}
                <i
                  className="fas fa-bars menu-mobile"
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={handleClick}
                ></i>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SwipeableTemporaryDrawer
        direction="right"
        show={open}
        setOpen={setOpen}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
