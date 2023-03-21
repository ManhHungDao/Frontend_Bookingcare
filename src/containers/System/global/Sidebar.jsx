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
import { useDispatch } from "react-redux";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlaylistAddCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCircleOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Divider from "@mui/material/Divider";
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
                title="Thêm người dùng"
                to="/admin/add-user"
                icon={<PersonAddAltIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách người dùng"
                to="/admin/manage-user"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Divider />
              <Item
                title="Thêm lịch khám"
                to="/admin/add-user-schedule"
                icon={<AddCircleOutlineOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Lịch khám người dùng"
                to="/admin/manage-user-schedule"
                icon={<PendingActionsIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={isCollapsed ? "" : "Phòng khám"}
              icon={<HomeWorkOutlinedIcon />}
            >
              <Item
                title="Thêm phòng khám"
                to="/admin/add-clinic"
                icon={<AddHomeOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách phòng khám"
                to="/admin/manage-clinic"
                icon={<BallotOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Divider />
              <Item
                title="Thêm gói khám"
                to="/admin/add-packet"
                icon={<PlaylistAddCircleOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách gói khám"
                to="/admin/manage-packet"
                icon={<MenuOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Divider />
              <Item
                title="Thêm lịch gói khám"
                to="/admin/add-packet-schedule"
                icon={<AddCircleOutlineOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Lịch khám các gói"
                to="/admin/manage-packet-schedule"
                icon={<PendingActionsIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={isCollapsed ? "" : "Chuyên khoa"}
              icon={<VaccinesOutlinedIcon />}
            >
              <Item
                title="Thêm chuyên khoa"
                to="/admin/add-specialty"
                icon={<AddCircleOutlineOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách chuyên khoa"
                to="/admin/manage-specialty"
                icon={<ListAltOutlinedIcon />}
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
                to="/admin/add-handbook"
                icon={<BookmarkAddOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Danh sách cẩm nang"
                to="/admin/manage-handbook"
                icon={<CollectionsBookmarkOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title={isCollapsed ? "" : "Tác vụ"}
              icon={<AppRegistrationIcon />}
            >
              <Item
                title="Giá dịch vụ"
                to="/admin/manage-code-price"
                icon={<AttachMoneyIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Phương thức"
                to="/admin/manage-code-payment"
                icon={<CreditCardIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Thành phố"
                to="/admin/manage-code-province"
                icon={<ApartmentOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Thời gian"
                to="/admin/manage-code-time"
                icon={<AccessAlarmIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
              <Item
                title="Chuyên khoa"
                to="/admin/manage-code-specialty"
                icon={<ShieldOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            </SubMenu>

            <LogOut
              title="Thoát"
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
