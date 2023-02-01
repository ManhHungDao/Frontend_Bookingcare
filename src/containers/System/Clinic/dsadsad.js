import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import "./ModalAddEditClinic.scss";
import { FormattedMessage } from "react-intl";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import _ from "lodash";
import { Box, Typography, useTheme, Grid, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import {
  updateClinic,
  deleteClinicService,
  getClinic,
  createANewClinic,
} from "../../../services/userService";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import { tokens } from "../theme";

class AddEditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      image: "",
      previewImgUrl: "",
      name: "",
      address: "",
      errors: {},
      selectedClinic: "",
      listClinic: [],
      listDetailClinic: [],
      logo: "",
      previewLogoUrl: "",
      openModal: false,
    };
  }
  // theme = useTheme();
  // colors = tokens(theme.palette.mode);

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (prevProps.dataEdit !== this.props.dataEdit) {
      this.fillDatainput(this.props.dataEdit);
    }
    if (this.props.openModal !== prevProps.openModal) {
      this.setState({
        openModal: this.props.openModal,
      });
    }
  }

  fillDatainput = (data) => {
    if (!_.isEmpty(data)) {
      this.setState({
        name: data.name,
        address: data.address,
        image: data.image,
        logo: data.logo,
        previewImgUrl: data.image,
        previewLogoUrl: data.logo,
      });
    }
  };
  handleOnChangeImage = (image) => {
    this.setState({
      image,
    });
  };
  handleOnChangeLogo = (logo) => {
    this.setState({
      logo,
    });
  };

  handleEditorChange = (content) => {
    this.setState({
      content,
    });
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidate = () => {
    let errors = {};
    let { image, name, address, content, logo } = this.state;
    const { language } = this.props;
    if (language === "en") {
      if (!image) errors.image = "Upload image";
      if (!name) errors.name = "Name must be entered";
      if (!address) errors.address = "Address must be entered";
      if (!content) errors.content = "Details clinic must be entered";
    } else {
      if (!image) errors.image = "Tải ảnh phòng khám";
      if (!logo) errors.logo = "Tải ảnh đại diện phòng khám";
      if (!name) errors.name = "Tên không được bỏ trống";
      if (!address) errors.address = "Địa chỉ không được bỏ trống";
      if (!content) errors.content = "Chi tiết phòng khám không được bỏ trống";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  handleDeleteClinic = async (id) => {
    const res = await deleteClinicService(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Clinic Succeed");
      this.props.getListClinicHome();
    }
  };
  handleEditClinic = async (data) => {
    this.fillDatainput(data);
  };
  handleSave = async () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    const data = {
      image: this.state.image,
      name: this.state.name,
      address: this.state.address,
      logo: this.state.logo,
    };
    if (!this.state.idEditClinic) {
      const res = await createANewClinic(data);
      if (res && res.errCode === 0) {
        toast.success("create a new alinic succeed");
        this.setState({
          content: "",
          name: "",
          image: "",
          previewImgUrl: "",
          address: "",
          selectedClinic: "",
          errors: "",
          logo: "",
          previewLogoUrl: "",
        });
        this.props.getListClinicHome();
      } else {
        toast.error("create a new alinic failed");
      }
    } else {
      const res = await updateClinic({ ...data, id: this.state.idEditClinic });
      if (res && res.errCode === 0) {
        toast.success("update alinic succeed");
        this.setState({
          content: "",
          name: "",
          image: "",
          previewImgUrl: "",
          address: "",
          selectedClinic: "",
          errors: "",
          logo: "",
          previewLogoUrl: "",
        });
        this.props.getListClinicHome();
      } else {
        toast.error("update alinic failed");
      }
    }
  };
  render() {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    let { errors } = this.state;
    return (
      <>
        <Box m="20px">
          <Header title="Add New Clinic" subtitle="Managing the Clinics" />
          <Grid container spacing={2} rowSpacing={{ sm: 2, md: 6 }}>
            <Grid container item xs={12} md={4}>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="outlined-required"
                  label={<FormattedMessage id="admin.manage-clinic.name" />}
                  fullWidth
                  onChange={(event) => this.handleOnChangeInput(event, "name")}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="outlined-required"
                  label={<FormattedMessage id="admin.manage-clinic.address" />}
                  fullWidth
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              rowSpacing={{ sm: 2, md: 6 }}
              xs={12}
              md={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item xs={12} md={4}>
                <UpLoadAvatar
                  content={<FormattedMessage id="admin.manage-clinic.image" />}
                  borderRadius="5px"
                  preWidth="400px"
                  uploadImage={this.handleOnChangeImage}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UpLoadAvatar
                  content={<FormattedMessage id="admin.manage-clinic.logo" />}
                  borderRadius="5px"
                  preWidth="400px"
                  uploadImage={this.handleOnChangeLogo}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormattedMessage id="admin.manage-clinic.introduce" />
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleEditorChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormattedMessage id="admin.manage-doctor.detail" />
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleEditorChange}
              />
            </Grid>
            <Grid xs={12} md={12} item display="flex" justifyContent="flex-end">
              {/* <ButtonComponent
                content={<FormattedMessage id="manage-user.save" />}
                // handleClick={handleSave}
                bgcolor={colors.greenAccent[700]}
                color={colors.grey[100]}
                hoverBgColor={colors.greenAccent[200]}
                hoverColor="#fff"
              /> */}
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    createDetailClinic: (data) => dispatch(actions.createDetailClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditClinic);
