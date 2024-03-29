/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changLanguageApp } from "../../../store/actions";
import { Grid, Stack, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useIsTablet from "../../../components/useScreen/useIsTablet.js";
import SwipeableTemporaryDrawer from "./LeftBar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import * as actions from "../../../store/actions";

const HomeHeader = ({ processLogout, isLoggedIn }) => {
  const smScreen = useIsTablet();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const returnHome = () => {
    navigate(`/`);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClickMenuItem = (link) => {
    setOpen(false);
    navigate(link);
  };
  return (
    <>
      <div className="home-header-container d-flex align-items-center">
        <div className="container">
          <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
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
            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              {isLoggedIn ? (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClickBtn}
                  >
                    <PersonRoundedIcon sx={{ fontSize: 25 }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => handleClickMenuItem("/patient/account")}
                    >
                      Thông tin cá nhân
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickMenuItem("/patient/booking")}
                    >
                      Đơn đặt lịch
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleClickMenuItem("/patient/change-password")
                      }
                    >
                      Đổi mật khẩu
                    </MenuItem>
                    <MenuItem onClick={processLogout}>Thoát</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <div>
                    <span
                      className="lang-vi"
                      onClick={() => navigate("/register")}
                    >
                      Đăng Kí
                    </span>
                  </div>
                  <div>
                    <span
                      className="lang-en"
                      onClick={() => navigate("/login")}
                    >
                      Đăng Nhập
                    </span>
                  </div>
                </>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
      <SwipeableTemporaryDrawer
        direction="left"
        show={open}
        setOpen={setOpen}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.patient.isPatientLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
    processLogout: () => dispatch(actions.processPatientLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
