import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Modal,
  Button,
  Switch,
} from "@mui/material";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import AccountProfile from "./Section/AccountProfile";
import {
  AccountProfileDetails,
  AccountProfilelClinic,
} from "./Section/account-profile-details";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";

const DetailUser = ({
  id,
  getSingleUser,
  fetchAllcode,
  user,
  allcodes,
  getListClinic,
  listClinic,
}) => {
  const [open, setOpen] = useState(true);
  const [isChecked, setChecked] = useState(false);
  //infomation doctor
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("123456Aa.");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [role, setRole] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  //information doctor's clinic
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [listClinicSelect, setListClinicSelect] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSingleUser("63fa590e18396ceb24e38a76");
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
      setProvince(user.province);
      setGender(user.gender);
      setPosition(user.positionId);
      setImage(user?.image?.url ? user.image.url : "");
      setDate(user.dateOfBirth);
      setRole(user.roleId);
      setClinic(user.clinic);
      setSpecialty(user.specialty);
      setPrice(user.price);
      setPayment(user.payment);
      setIntroduce(user.introduce);
      setNote(user.note);
      setContent(user.content);
    }
  }, [user]);

  useEffect(() => {
    if (_.isEmpty(allcodes)) fetchAllcode();
    else
      setDataSelect(
        allcodes.map((e) => ({ id: e.keyMap, name: e.valueVI, type: e.type }))
      );
  }, [allcodes]);

  useEffect(() => {
    if (_.isEmpty(listClinic)) getListClinic();
    if (listClinic) {
      let data = listClinic.map((e) => {
        return {
          id: e._id,
          name: e.name,
        };
      });
      setListClinicSelect(data);
    }
  }, [listClinic]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setName("");
    setPhone("");
    setAddress("");
    setProvince("");
    setGender("");
    setPosition("");
    setImage("");
    setDate("");
    setRole("");
    setClinic("");
    setSpecialty("");
    setPrice("");
    setPayment("");
    setIntroduce("");
    setNote("");
    setContent("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "80vh",
    overflowY: "scroll",
  };
  const handleSave = () => {};
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box m="20px">
            <Header
              title="Chi tiết Người Dùng"
              // isShowSwitch={true}
              // titleSwich="Chỉnh sửa"
              // isChecked={isChecked}
              // setChecked={setChecked}
            />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Container maxWidth="lg">
              <Stack>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile
                      name={name}
                      email={email}
                      position={position}
                      roleId={role}
                      address={address}
                      image={image}
                      setImage={setImage}
                      phone={phone}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                    />
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <AccountProfileDetails
                      email={email}
                      setEmail={setEmail}
                      name={name}
                      setName={setName}
                      phone={phone}
                      setPhone={setPhone}
                      address={address ? address?.detail : ""}
                      setAddress={setAddress}
                      setProvince={setProvince}
                      gender={gender}
                      setGender={setGender}
                      position={position}
                      setPosition={setPosition}
                      date={date}
                      setDate={setDate}
                      errors={errors}
                      dataSelect={dataSelect}
                    />
                  </Grid>
                  <Grid xs={12} md={12} lg={12}>
                    <AccountProfilelClinic
                      clinic={clinic}
                      setClinic={setClinic}
                      specialty={specialty}
                      setSpecialty={setSpecialty}
                      price={price}
                      setPrice={setPrice}
                      payment={payment}
                      setPayment={setPayment}
                      introduce={introduce}
                      setIntroduce={setIntroduce}
                      note={note}
                      setNote={setNote}
                      content={content}
                      setContent={setContent}
                      dataSelect={dataSelect}
                      listClinicSelect={listClinicSelect}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </Grid>
                </Grid>
                <Grid display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <ButtonComponent
                    content="Lưu"
                    handleClick={handleSave}
                    bgcolor="#94e2cd"
                    color="#141414"
                    hoverBgColor="#1e5245"
                    hoverColor="#fff"
                  />
                </Grid>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.admin.user,
    listClinic: state.admin.listClinic,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleUser: (id) => dispatch(actions.getSingleUserAction(id)),
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    getListClinic: () => dispatch(actions.getListClinicAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);
