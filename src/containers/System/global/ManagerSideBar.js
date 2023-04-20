import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PlaylistAddCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCircleOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Item = ({ title, to, icon, isCollapsed, selected, setSelected }) => {
  const dispatch = useDispatch();
  const handleSelected = () => {
    setSelected(title);
    dispatch({ type: actions.SET_MENU, data: title });
  };
  return (
    <MenuItem
      active={title === selected}
      onClick={() => handleSelected()}
      icon={icon}
    >
      {!isCollapsed && <Typography>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const LogOut = ({ title, to, icon, processLogout, isCollapsed }) => {
  return (
    <MenuItem onClick={processLogout} icon={icon}>
      {!isCollapsed && <Typography>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const ManagerSideBar = ({ userInfo, menuOpen, processLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(menuOpen);
  }, [menuOpen]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#262b40 !important`,
          minHeight: "100vh ",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 5px 5px 20px !important",
          color: "#eaedf2 !important",
        },
        "& .pro-inner-item:hover": {
          color: "#fff !important",
          backgroundColor: "#2e3650 !important",
          borderRadius: "5px",
        },
        "& .pro-menu-item": {
          padding: "5px 0 ",
        },
        "& .pro-menu-item.active": {
          color: "#f3f3f3 !important",
          border: "1px solid #eaedf2 !important",
          borderRadius: "5px",
          backgroundColor: "#2e3650 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              padding: "5px 0 ",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="h5" color="#f3f3f3">
                  HEALTHCARE
                </Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{ color: "#f3f3f3" }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{ width: "90%", paddingLeft: "5%" }}
          >
            <Item
              title="Trang Chính"
              to="/manager"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenu
              title={isCollapsed ? "" : "Lịch khám"}
              icon={<CalendarMonthIcon />}
            >
              <Item
                title="Thêm lịch bác sĩ"
                to="/manager/add-user-schedule"
                icon={<AddCircleOutlineOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Lịch khám bác sĩ"
                to="/manager/manage-user-schedule"
                icon={<PendingActionsIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Divider />
              <Item
                title="Thêm lịch gói khám"
                to="/manager/add-packet-schedule"
                icon={<LibraryBooksIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Lịch khám các gói"
                to="/manager/manage-packet-schedule"
                icon={<PendingActionsIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={isCollapsed ? "" : "Gói khám"}
              icon={<AddBoxIcon />}
            >
              <Item
                title="Thêm gói khám"
                to="/manager/add-packet"
                icon={<PlaylistAddCircleOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách gói khám"
                to="/manager/manage-packet"
                icon={<MenuOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu
              title={isCollapsed ? "" : "Cẩm nang"}
              icon={<BookmarksOutlinedIcon />}
            >
              <Item
                title="Thêm cẩm nang"
                to="/manager/add-handbook"
                icon={<BookmarkAddOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách cẩm nang"
                to="/manager/manage-handbook"
                icon={<CollectionsBookmarkOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>

            <LogOut
              title="Thoát"
              to="/system-login"
              icon={<LogoutIcon />}
              isCollapsed={isCollapsed}
              processLogout={processLogout}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
    menuOpen: state.app.menuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changLanguageApp(language)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerSideBar);
