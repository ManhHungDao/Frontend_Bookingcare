import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
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

const role = [
  { id: "R1", name: "admin" },
  { id: "R2", name: "doctor" },
  { id: "R3", name: "users" },
];

const Sidebar = ({ userInfo, menuOpen, processLogout }) => {
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
              margin: "10px 0 20px 0",
              padding: "5px 0 ",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color="#f3f3f3">
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
          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userInfo?.image.url}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              </Box> */}
              {/* <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="#f3f3f3"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo && <span>{userInfo?.name}</span>}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {role &&
                    role.map((i) => {
                      if (i.id === userInfo.roleId) return i.name;
                    })}
                </Typography>
              </Box> */}
            </Box>
          )}

          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{ width: "90%" }}
          >
            <Item
              title="Trang Chính"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <SubMenu
              title={isCollapsed ? "" : "Người dùng"}
              icon={<PermIdentityOutlinedIcon />}
            >
              <Item
                title="Thêm Người Dùng"
                to="/admin/add-user"
                icon={<PersonAddAltIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh Sách Người Dùng"
                to="/admin/manage-user"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={isCollapsed ? "" : "Phòng khám"}
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
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh Sách Phòng Khám"
                to="/admin/manage-clinic"
                icon={<BallotOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={isCollapsed ? "" : "Chuyên khoa"}
              icon={<ShieldOutlinedIcon />}
            >
              <Item
                title="Thêm Chuyên Khoa"
                to="/admin/add-specialty"
                icon={<LibraryAddOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Chi Tiết Chuyên Khoa"
                to="/admin/detail-specialty"
                icon={<ArticleOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh Sách Chuyên Khoa"
                to="/admin/manage-specialty"
                icon={<BallotOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <LogOut
              title="Logout"
              to="/login"
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
