import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
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
} from "@mui/material";
import Header from "../../../components/Header.jsx";
import _ from "lodash";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DetailUser from "./DetailUser";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import "./Style.scss";

const TableManageUser = (props) => {
  const { userInfo } = props;
  const [users, setUsers] = useState([]);
  // const [listSeach, setListSeach] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [userEdit, setUserEdit] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userDelete, setUserDelete] = useState({});

  const role = [
    {
      id: "R0",
      name: "Root",
      icon: <AdminPanelSettingsOutlinedIcon />,
      bgcolor: "#4cceac",
    },
    {
      id: "R1",
      name: "Admin",
      icon: <AdminPanelSettingsOutlinedIcon />,
      bgcolor: "#4cceac",
    },
    {
      id: "R2",
      name: "Manager",
      icon: <SecurityOutlinedIcon />,
      bgcolor: "#2e7c67",
    },
    {
      id: "R3",
      name: "Doctor",
      icon: <LockOpenOutlinedIcon />,
      bgcolor: "#2e7c67",
    },
  ];

  useEffect(() => {
    props.getAllUserAction();
  }, []);

  useEffect(() => {
    if (props.isSuccess !== null) {
      if (props.isSuccess === true) {
        props.getAllUserAction();
        setOpen(false);
      }
      setOpenConfirmModal(false);
      props.clearStatus();
    }
  }, [props.isSuccess]);

  useEffect(() => {
    let listUser = props.users.map((i) => {
      return {
        ...i,
        id: i._id,
        image: i.image.url,
        // email: i.email,
        // name: i.name,
        // phone: i.phone,
        // address: i.address,
        // positionId: i.positionId,
        // roleId: i.roleId,
        // gender: i.gender,
      };
    });
    setUsers(listUser);
    // setListSeach(listUser);
  }, [props.users]);
  // useEffect(() => {
  //   let data = users;
  //   let dataSearch = data.filter((e) => {
  //     return e.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  //   setListSeach(dataSearch);
  // }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  const hadnleClickView = (data) => {
    setUserEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (user) => {
    setOpenConfirmModal(true);
    setUserDelete(user);
  };
  const handleDeleteUser = () => {
    const id = userDelete.id;
    if (id) props.deleteUserAction(id);
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <TableCell>Người dùng</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Số điện thoại</TableCell>
      <TableCell>Địa chỉ</TableCell>
      <TableCell>Vị trí</TableCell>
      <TableCell>Quyền</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { address, name, image, phone, email, roleId, detail } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img className="table__clinic--logo" src={image} alt={name} />
              </div>
              <div> {name}</div>
            </span>
          </TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell>{address?.detail ? address?.detail : ""}</TableCell>
          <TableCell>
            <Typography variant="">
              {detail.position.name ? detail.position.name : ""}
            </Typography>
          </TableCell>
          <TableCell>
            {role &&
              role.map((i) => {
                if (i.id === roleId)
                  return (
                    <>
                      <Box
                        width="60%"
                        // m="0 auto"
                        p="5px 15px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={i.bgcolor}
                        borderRadius="4px"
                      >
                        {i.icon}
                        <Typography color="#141414" sx={{ ml: "5px" }}>
                          {i.name}
                        </Typography>
                      </Box>
                    </>
                  );
              })}
          </TableCell>
          {userInfo.roleId === "R2" ? (
            <TableCell>
              <Tooltip title="Xem">
                <IconButton onClick={() => hadnleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : (
            <TableCell>
              <Tooltip title="Xem">
                <IconButton onClick={() => hadnleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
              {roleId !== "R0" && roleId !== userInfo.roleId && (
                <Tooltip title="Xóa">
                  <IconButton onClick={() => handelClickDelete(props)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          )}
        </TableRow>
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header
          title="Danh sách người dùng"
          subtitle="Quản lý thành viên"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-user"
          activeMenu="Thêm Người Dùng"
        />
        <Box m="40px 0 0 0" height="75vh">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRowName />
              </TableHead>
              <TableBody>
                {users &&
                  users.length > 0 &&
                  users.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {users && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Box>
      </Box>
      {userEdit && <DetailUser open={open} setOpen={setOpen} user={userEdit} />}
      {userDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa người dùng"
          content={`${userDelete?.name ? userDelete.name : ""}`}
          type="DELETE"
          confirmFunc={handleDeleteUser}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    isSuccess: state.app.isSuccess,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserAction: (type) => dispatch(actions.getAllUserAction(type)),
    deleteUserAction: (id) => dispatch(actions.deleteUserAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
