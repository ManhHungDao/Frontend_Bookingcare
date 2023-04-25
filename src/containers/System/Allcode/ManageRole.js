import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import InputSelect from "../../../components/Input/InputSelect";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  OutlinedInput,
  FormControl,
  Grid,
  InputAdornment,
  Autocomplete,
  TextField,
  Stack,
  MenuItem,
  InputLabel,
  Select,
  CardContent,
  ListItem,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Card } from "reactstrap";
import Checkbox from "@mui/material/Checkbox";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

const features = [
  { value: "patient", name: "Người dùng" },
  { value: "user", name: "Bác sĩ" },
  { value: "clinic", name: "Phòng khám" },
  { value: "specialty", name: "Chuyên khoa" },
  { value: "code", name: "Tác vụ" },
];
const roles = [
  { value: "R1", name: "Admin" },
  { value: "R2", name: "Manager" },
  { value: "R3", name: "Doctor" },
];
const ManageRole = ({ listManagers, getAllManagerAction }) => {
  const [data, setData] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [feature, setFeature] = useState("");
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState([0]);

  useEffect(() => {
    getAllManagerAction();
  }, []);

  useEffect(() => {
    if (listManagers.length > 0)
      setData(
        listManagers.map((e) => ({
          id: e._id,
          name: e.name,
        }))
      );
  }, [listManagers]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.name,
  };

  return (
    <>
      <Box m="20px">
        <Header title="Cấp quyền" />
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
                {roles.map((e) => (
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
                setValue(newValue);
              }}
              value={value}
              {...defaultProps}
              renderInput={(params) => (
                <TextField {...params} label="Người dùng" />
              )}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chức năng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                input={<OutlinedInput label="Chức năng" />}
              >
                {features.map((e) => (
                  <MenuItem key={e.value} value={e.value}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} md={4}>
            <Card>
              <CardContent>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Cấp quyền
                    </ListSubheader>
                  }
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <AccountBoxOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Người dùng" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                      {["a", "b", 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
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
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <PermIdentityOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bác sĩ" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                      {["a", "b", 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
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
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <HomeWorkOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Phòng khám" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                      {["a", "b", 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
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
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <VaccinesOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chuyên khoa" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                      {["a", "b", 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
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
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <BookmarksOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cẩm nang" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                      {["a", "b", 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
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
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <AppRegistrationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tác vụ" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                      {["a", "b", 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            // disablePadding
                            sx={{ p: 0, pl: 3 }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                              sx={{ height: "30px" }}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
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
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listManagers: state.admin.listManagers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllManagerAction: () => dispatch(actions.getAllManagerAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRole);
