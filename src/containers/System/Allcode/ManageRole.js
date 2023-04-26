import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import InputSelect from "../../../components/Input/InputSelect";
import {
  Box,
  OutlinedInput,
  FormControl,
  Grid,
  Autocomplete,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  CardContent,
  ListItem,
  Card,
  CardHeader,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { roles } from "../../../utils";
import ButtonComponent from "../../../components/ButtonComponent";
import { toast } from "react-toastify";
const typeMember = [
  { value: "R1", name: "Admin" },
  { value: "R2", name: "Manager" },
  { value: "R3", name: "Doctor" },
];
const ManageRole = ({
  listManagers,
  getAllManagerAction,
  upsertRoleUserAction,
  clearStatus,
  isSuccess,
  userPermissions,
  getRoleUserAction,
}) => {
  const [data, setData] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [user, setUser] = useState(null);
  const [openPatient, setOpenPatient] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCLinic, setOpenCLinic] = useState(false);
  const [openSpecialty, setOpenSpecialty] = useState(false);
  const [openHandbook, setOpenHandbook] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [checkedPatient, setCheckedPatient] = useState([]);
  const [checkedUser, setCheckedUser] = useState([]);
  const [checkedClinic, setCheckedClinic] = useState([]);
  const [checkedSpecialty, setCheckedSpecialty] = useState([]);
  const [checkedHandbook, setCheckedHandbook] = useState([]);
  const [checkedCode, setCheckedCode] = useState([]);

  const resetState = () => {
    setCheckedPatient([]);
    setCheckedUser([]);
    setCheckedClinic([]);
    setCheckedSpecialty([]);
    setCheckedHandbook([]);
    setCheckedCode([]);
    setOpenPatient(false);
    setOpenUser(false);
    setOpenCLinic(false);
    setOpenSpecialty(false);
    setOpenHandbook(false);
    setOpenCode(false);
  };

  useEffect(() => {
    getAllManagerAction();
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      setUserGroup("");
      setUser(null);
      resetState();
    }
    clearStatus();
  }, [isSuccess]);

  useEffect(() => {
    if (listManagers.length > 0)
      setData(
        listManagers.map((e) => ({
          id: e._id,
          name: e.name,
        }))
      );
  }, [listManagers]);

  useEffect(() => {
    resetState();
    if (user !== null) {
      getRoleUserAction(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (userPermissions.length > 0) {
      setCheckedPatient(userPermissions.filter((e) => e.includes("patient")));
      setCheckedUser(userPermissions.filter((e) => e.includes("user")));
      setCheckedClinic(
        userPermissions.filter(
          (e) => e.includes("clinic") || e.includes("packet")
        )
      );
      setCheckedSpecialty(
        userPermissions.filter((e) => e.includes("specialty"))
      );
      setCheckedHandbook(userPermissions.filter((e) => e.includes("handbook")));
      setCheckedCode(userPermissions.filter((e) => e.includes("code")));
    }
  }, [userPermissions]);

  const handleToggle = (value, name) => () => {
    if (name === "patient") {
      const currentIndex = checkedPatient.indexOf(value);
      const newChecked = [...checkedPatient];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedPatient(newChecked);
    } else if (name === "user") {
      const currentIndex = checkedUser.indexOf(value);
      const newChecked = [...checkedUser];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedUser(newChecked);
    } else if (name === "clinic") {
      const currentIndex = checkedClinic.indexOf(value);
      const newChecked = [...checkedClinic];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedClinic(newChecked);
    } else if (name === "specialty") {
      const currentIndex = checkedSpecialty.indexOf(value);
      const newChecked = [...checkedSpecialty];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedSpecialty(newChecked);
    } else if (name === "handbook") {
      const currentIndex = checkedHandbook.indexOf(value);
      const newChecked = [...checkedHandbook];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedHandbook(newChecked);
    } else if (name === "code") {
      const currentIndex = checkedCode.indexOf(value);
      const newChecked = [...checkedCode];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedCode(newChecked);
    }
  };

  const handleSave = () => {
    if (!user) {
      toast.error("Chưa chọn người dùng");
      return;
    }
    const permissions = [
      ...checkedPatient,
      ...checkedUser,
      ...checkedClinic,
      ...checkedSpecialty,
      ...checkedHandbook,
      ...checkedCode,
    ];
    upsertRoleUserAction({
      userId: user.id,
      permissions,
    });
  };

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.name,
  };

  return (
    <>
      <Box m="20px">
        <Header title="Phân quyền người dùng" />
        <Grid container spacing={2}>
          <Grid item xs={4} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Nhóm tài khoản
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userGroup}
                onChange={(e) => setUserGroup(e.target.value)}
                input={<OutlinedInput label="Nhóm tài khoản" />}
              >
                {typeMember.map((e) => (
                  <MenuItem key={e.value} value={e.value}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} md={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => {
                setUser(newValue);
              }}
              value={user}
              {...defaultProps}
              renderInput={(params) => (
                <TextField {...params} label="Người dùng" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} xl={4}>
            <Card>
              <CardHeader title="Cấp quyền" />
              <CardContent
                sx={{
                  maxHeight: 650,
                  overflow: "auto",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={() => setOpenPatient(!openPatient)}>
                    <ListItemIcon>
                      <AccountBoxOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Người dùng" />
                    {openPatient ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openPatient} timeout="auto" unmountOnExit>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      disablePadding
                    >
                      {roles.patient.map((e) => {
                        const labelId = `checkbox-list-label-${e.value}`;

                        return (
                          <ListItem
                            key={e.value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(e.value, "patient")}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    checkedPatient.indexOf(e.value) !== -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`${e.name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
                {/* bác sĩ */}
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={() => setOpenUser(!openUser)}>
                    <ListItemIcon>
                      <PermIdentityOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bác sĩ" />
                    {openUser ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openUser} timeout="auto" unmountOnExit>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      disablePadding
                    >
                      {roles.user.map((e) => {
                        const labelId = `checkbox-list-label-${e.value}`;

                        return (
                          <ListItem
                            key={e.value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(e.value, "user")}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checkedUser.indexOf(e.value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`${e.name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
                {/* phòng khám */}
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={() => setOpenCLinic(!openCLinic)}>
                    <ListItemIcon>
                      <HomeWorkOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Phòng khám" />
                    {openCLinic ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCLinic} timeout="auto" unmountOnExit>
                    {/* <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List> */}
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      disablePadding
                    >
                      {roles.clinic.map((e) => {
                        const labelId = `checkbox-list-label-${e.value}`;

                        return (
                          <ListItem
                            key={e.value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(e.value, "clinic")}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    checkedClinic.indexOf(e.value) !== -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`${e.name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
                {/* chuyên khoa */}
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton
                    onClick={() => setOpenSpecialty(!openSpecialty)}
                  >
                    <ListItemIcon>
                      <VaccinesOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chuyên khoa" />
                    {openSpecialty ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openSpecialty} timeout="auto" unmountOnExit>
                    {/* <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List> */}
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      disablePadding
                    >
                      {roles.specialty.map((e) => {
                        const labelId = `checkbox-list-label-${e.value}`;

                        return (
                          <ListItem
                            key={e.value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(e.value, "specialty")}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    checkedSpecialty.indexOf(e.value) !== -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`${e.name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
                {/* cẩm nang */}
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton
                    onClick={() => setOpenHandbook(!openHandbook)}
                  >
                    <ListItemIcon>
                      <BookmarksOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cẩm nang" />
                    {openHandbook ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openHandbook} timeout="auto" unmountOnExit>
                    {/* <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List> */}
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      disablePadding
                    >
                      {roles.handbook.map((e) => {
                        const labelId = `checkbox-list-label-${e.value}`;

                        return (
                          <ListItem
                            key={e.value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(e.value, "handbook")}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    checkedHandbook.indexOf(e.value) !== -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`${e.name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
                {/* tác vụ */}
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={() => setOpenCode(!openCode)}>
                    <ListItemIcon>
                      <AppRegistrationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tác vụ" />
                    {openCode ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCode} timeout="auto" unmountOnExit>
                    {/* <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List> */}
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      disablePadding
                    >
                      {roles.code.map((e) => {
                        const labelId = `checkbox-list-label-${e.value}`;

                        return (
                          <ListItem
                            key={e.value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(e.value, "code")}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checkedCode.indexOf(e.value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`${e.name}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} display="flex" justifyContent="flex-end">
            <ButtonComponent
              content="Lưu"
              handleClick={handleSave}
              bgcolor="#94e2cd"
              color="#141414"
              hoverBgColor="#1e5245"
              hoverColor="#fff"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listManagers: state.admin.listManagers,
    userPermissions: state.admin.userPermissions,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllManagerAction: () => dispatch(actions.getAllManagerAction()),
    upsertRoleUserAction: (data) =>
      dispatch(actions.upsertRoleUserAction(data)),
    getRoleUserAction: (id) => dispatch(actions.getRoleUserAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRole);
