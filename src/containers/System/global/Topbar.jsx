import React from "react";
import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import * as actions from "../../../store/actions";
import { connect, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Topbar = ({ processLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePass = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/admin/reset-password");
  };
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonOutlinedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleChangePass}>Đổi mật khẩu</MenuItem>
        <MenuItem onClick={processLogout}>Thoát</MenuItem>
      </Menu>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
