import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils } from "../../../utils";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";
import TableManageSpecialty from "./TableManageSpecialty";
import {
  deleteSpecialtyService,
  updateSpecialtyService,
} from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      contentHTML: "",
      contentMarkdown: "",
      isOpen: false,
      previewImgUrl: "",
      name: "",
      errors: {},
      listClinic: [],
      selectedClinic: "",
      idClinicEdit: "",
      idSpecialtyEdit: "",
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listClinic !== prevProps.listClinic) {
      const dataSelect = this.buildDataInputSelect(this.props.listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
  clearState = () => {
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      name: "",
      image: "",
      previewImgUrl: "",
      errors: {},
      idClinicEdit: "",
      idSpecialtyEdit: "",
    });
  };
  buildDataInputSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      let object;
      data.forEach((item) => {
        object = {
          label: item.name,
          value: item.id,
        };
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = (selectedOption) => {
    this.clearState();
    this.setState({
      selectedClinic: selectedOption,
    });
  };
  handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const url = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: url,
        image: base64,
      });
    }
  };

  openReviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
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
    let { image, name, address, contentMarkdown } = this.state;
    const { language } = this.props;
    if (language === "en") {
      if (!image) errors.image = "Upload image";
      if (!name) errors.name = "Name must be entered";
      if (!contentMarkdown)
        errors.contentMarkdown = "Details specialty must be entered";
    } else {
      if (!image) errors.image = "Tải ảnh phòng khám";
      if (!name) errors.name = "Tên không được bỏ trống";
      if (!contentMarkdown)
        errors.contentMarkdown = "Chi tiết không được bỏ trống";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  deleteSpecialty = async (id) => {
    const res = await deleteSpecialtyService(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Specialty Succeed");
      let clinicId = this.state.selectedClinic.value;
      this.props.getListSpecialtyByClinicId(clinicId);
    } else toast.error("Delete Specialty Failed");
  };
  editSpecialty = async (data) => {
    this.setState({
      name: data.name,
      image: data.image,
      previewImgUrl: data.image,
      contentMarkdown: data.detailMarkdown,
      contentHTML: data.detailHTML,
      idClinicEdit: data.clinicId ? data.clinicId : "",
      idSpecialtyEdit: data.id,
    });
  };
  handleSave = async () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    let selectClinic = this.state.selectedClinic;
    let clinicId = selectClinic.value ? selectClinic.value : null;
    let data = {
      image: this.state.image,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      name: this.state.name,
    };
    // no select list clinic
    if (
      !this.state.idClinicEdit &&
      !this.state.idSpecialtyEdit &&
      !this.state.selectedClinic
    )
      this.props.createASpecialty(data);
    if (
      !this.state.idClinicEdit &&
      this.state.idSpecialtyEdit &&
      !this.state.selectedClinic
    ) {
      const res = await updateSpecialtyService({
        ...data,
        id: this.state.idSpecialtyEdit,
        isEditWithClinic: false,
      });
      if (res && res.errCode === 0) toast.success("Update Specialty Succeed");
      else toast.error("Update Specialty Failed");
    }
    // selected clinic
    if (
      !this.state.idClinicEdit &&
      !this.state.idSpecialtyEdit &&
      this.state.selectedClinic
    )
      this.props.createASpecialty({
        ...data,
        clinicId: this.state.selectedClinic.value,
      });

    if (this.state.idClinicEdit && this.state.selectedClinic) {
      const res = await updateSpecialtyService({
        ...data,
        id: this.state.idClinicEdit,
        isEditWithClinic: true,
      });
      if (res && res.errCode === 0) toast.success("Update Specialty Succeed");
      else toast.error("Update Specialty Failed");
    }
    this.props.getListSpecialtyByClinicId(clinicId);
    this.clearState();
  };
  render() {
    const { language } = this.props;
    let { errors, selectedClinic } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-specialty.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="specilalty-container">
              {selectedClinic && <h4>{selectedClinic.label}</h4>}
              <div className="find-clinic">
                <Select
                  value={this.state.selectedClinic}
                  onChange={this.handleChangeSelect}
                  options={this.state.listClinic}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                  }
                />
              </div>
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-specialty.name" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "name")}
                value={this.state.name}
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-specialty.image" />
              </label>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <div className="preview-img-container">
                <label className="lable-upload" htmlFor="previewImg">
                  <FormattedMessage id="admin.manage-specialty.upload" />

                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${this.state.previewImgUrl})`,
                  }}
                  onClick={() => this.openReviewImage()}
                ></div>
              </div>
              {errors.image && (
                <span className="text-danger">{errors.image}</span>
              )}
            </div>
            <div className="col-12 form-group">
              <FormattedMessage id="admin.manage-specialty.details" />
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
              {errors.contentMarkdown && (
                <span className="text-danger">{errors.contentMarkdown}</span>
              )}
            </div>
          </div>
          <button
            className="btn btn-primary mt-5"
            onClick={() => {
              this.handleSave();
            }}
          >
            save
          </button>
          <TableManageSpecialty
            clinicId={this.state.selectedClinic.value}
            deleteSpecialty={this.deleteSpecialty}
            editSpecialty={this.editSpecialty}
          />
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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
    createASpecialty: (data) => dispatch(actions.createASpecialty(data)),
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
