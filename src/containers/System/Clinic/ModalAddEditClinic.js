import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import "./ModalAddEditClinic.scss";
import { FormattedMessage } from "react-intl";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  updateClinic,
  deleteClinicService,
  getClinic,
  createANewClinic,
} from "../../../services/userService";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalAddEditClinic extends Component {
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
  handleOnChangeImage = async (event, name) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const url = URL.createObjectURL(file);
      if (name === "image")
        this.setState({
          previewImgUrl: url,
          image: base64,
        });
      else if (name === "logo") {
        this.setState({
          previewLogoUrl: url,
          logo: base64,
        });
      }
    }
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
    let { errors } = this.state;
    return (
      <>
        <Modal
          isOpen={this.state.openModal}
          toggle={() => {
            this.props.closeModal();
          }}
          centered
          size={"lg"}
          className="custom-modal-style"
        >
          <ModalHeader
            toggle={() => {
              this.props.closeModal();
            }}
          >
            <FormattedMessage id="admin.manage-clinic.title" />
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="admin.manage-clinic.name" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "name")
                    }
                    value={this.state.name}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="admin.manage-clinic.address" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                    value={this.state.address}
                  />
                  {errors.address && (
                    <span className="text-danger">{errors.address}</span>
                  )}
                </div>
                <div className="col-6 form-group pt-5">
                  <label>
                    <FormattedMessage id="admin.manage-clinic.image" />
                  </label>
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) =>
                      this.handleOnChangeImage(event, "image")
                    }
                  />
                  <div className="preview-img-container">
                    <label className="lable-upload" htmlFor="previewImg">
                      <FormattedMessage id="admin.manage-clinic.upload" />
                      <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                    ></div>
                  </div>
                  {errors.image && (
                    <span className="text-danger">{errors.image}</span>
                  )}
                </div>
                <div className="col-6 form-group pt-5">
                  <label>
                    <FormattedMessage id="admin.manage-clinic.logo" />
                  </label>
                  <input
                    id="previewLogo"
                    type="file"
                    hidden
                    onChange={(event) =>
                      this.handleOnChangeImage(event, "logo")
                    }
                  />
                  <div className="preview-img-container">
                    <label className="lable-upload" htmlFor="previewLogo">
                      <FormattedMessage id="admin.manage-clinic.upload" />
                      <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewLogoUrl})`,
                      }}
                    ></div>
                  </div>
                  {errors.logo && (
                    <span className="text-danger">{errors.logo}</span>
                  )}
                </div>
                <div className="col-12 form-group pt-5">
                  <FormattedMessage id="admin.manage-clinic.introduce" />
                  <CKEditorFieldBasic
                    value={this.state.content}
                    onChange={this.handleEditorChange}
                  />
                  {errors.content && (
                    <span className="text-danger">{errors.content}</span>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSave()}>
              {this.props.isAddNewUser ? (
                <FormattedMessage id="admin.manage-clinic.add" />
              ) : (
                <FormattedMessage id="admin.manage-clinic.save" />
              )}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddEditClinic);
