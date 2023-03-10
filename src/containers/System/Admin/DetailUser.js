import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import validator from "validator";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
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
  fetchAllcode,
  user,
  allcodes,
  getListClinic,
  listClinic,
  open,
  setOpen,
  updateUser,
}) => {
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
  const [imgUpdate, setImgUpdate] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  // check edit
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
      setAddress(user?.address?.detail ? user.address.detail : "");
      setProvince(user?.address?.province ? user.address.province : "");
      setGender(user.gender);
      setPosition(user.positionId);
      setImage(user?.image ? user.image : "");
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
        allcodes.map((e) => ({ id: e._id, name: e.valueVI, type: e.type }))
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
    setImgUpdate("");
    setEnableEdit(false);
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
    height: enableEdit ? "80vh" : "fit-content",
    maxHeight: "80vh",
    overflowY: "scroll",
  };
  const checkValidate = () => {
    let errors = {};
    if (!email) errors.email = "Email không được bỏ trống";
    if (!validator.isEmail(email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!address) errors.address = "Địa chỉ không được bỏ trống";
    if (!phone) errors.phone = "Số điện thoại không được bỏ trống";
    if (!validator.isMobilePhone(phone))
      errors.phone = "Số điện thoại không hợp lệ";
    if (!content) errors.content = "Chi tiết không được bỏ trống";
    if (!introduce) errors.introduce = "Mô tả không được bỏ trống";
    if (!note) errors.note = "Ghi chú không được bỏ trống";
    if (!position) errors.position = "Chưa chọn vị trí";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
    if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    if (!specialty) errors.specialty = "Chưa chọn khoa";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  const handleSave = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let data = {
      email,
      image: imgUpdate ? imgUpdate : null,
      name,
      phone,
      gender,
      positionId: position,
      address: { detail: address, province },
      dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
    };
    updateUser(user.id, data);
  };
  return (
    <>
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
              isShowSwitch={true}
              titleSwich={"Chỉnh sửa"}
              isChecked={enableEdit}
              setChecked={setEnableEdit}
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
                  <Grid
                    xs={12}
                    md={enableEdit ? 6 : 12}
                    lg={enableEdit ? 4 : 12}
                  >
                    <AccountProfile
                      name={name}
                      email={email}
                      position={position}
                      roleId={role}
                      address={address}
                      image={image}
                      phone={phone}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      enableEdit={enableEdit}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <AccountProfileDetails
                          email={email}
                          setEmail={setEmail}
                          name={name}
                          setName={setName}
                          phone={phone}
                          setPhone={setPhone}
                          address={address}
                          province={province}
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
                    </>
                  )}
                </Grid>
                {enableEdit && (
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
                )}
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
    listClinic: state.admin.listClinic,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    getListClinic: () => dispatch(actions.getListClinicAction()),
    updateUser: (id, data) => dispatch(actions.updateUserAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);
