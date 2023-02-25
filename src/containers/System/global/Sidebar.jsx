import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useDispatch } from "react-redux";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
const Item = ({ title, to, icon, menuOpen, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const handleSelected = () => {
    setSelected(title);
    dispatch({ type: actions.SET_MENU, data: title });
  };
  return (
    <MenuItem
      active={title === selected}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => handleSelected()}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const role = [
  { id: "R1", name: "admin" },
  { id: "R2", name: "doctor" },
  { id: "R3", name: "users" },
];

const Sidebar = ({ isLoggedIn, userInfo, processLogout, menuOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(menuOpen);
  }, [menuOpen]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
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
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  HEALTHCARE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userInfo?.image}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo && (
                    <span>
                      {userInfo?.firstName} {userInfo?.lastName}
                    </span>
                  )}
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  {role &&
                    role.map((i) => {
                      if (i.id === userInfo.roleId) return i.name;
                    })}
                </Typography> */}
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Trang Chính"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title={"Người dùng"}
              icon={<PermIdentityOutlinedIcon />}
              style={{
                color: colors.grey[100],
              }}
            >
              <Item
                title="Thêm Người Dùng"
                to="/admin/add-user"
                icon={<PersonAddAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Danh Sách Người Dùng"
                to="/admin/manage-user"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={"Phòng khám"}
              style={{
                color: colors.grey[100],
              }}
              icon={<HomeWorkOutlinedIcon />}
            >
              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            ></Typography> */}
              <Item
                title="Thêm Phòng Khám"
                to="/admin/add-clinic"
                icon={<AddHomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Danh Sách Phòng Khám"
                to="/admin/manage-clinic"
                icon={<BallotOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={"Chuyên khoa"}
              style={{
                color: colors.grey[100],
              }}
              icon={<ShieldOutlinedIcon />}
            >
              <Item
                title="Thêm Chuyên Khoa"
                to="/admin/manage-specialty"
                icon={<LibraryAddOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Danh Sách Chuyên Khoa"
                to="/admin/manage-list-clinic"
                icon={<BallotOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <Item
              title="Logout"
              to="/admin/faq"
              icon={<LogoutIcon />}
              onClick={processLogout}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
