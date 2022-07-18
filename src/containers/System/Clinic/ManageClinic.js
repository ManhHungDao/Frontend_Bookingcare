import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { createANewClinic } from "../../../services/userService";
import Select from "react-select";
import { toast } from "react-toastify";
import { getDetailClinic } from "../../../services/userService";
import _ from "lodash";
import { updateClinic, getListClinicHome } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      contentHTML: "",
      contentMarkdown: "",
      isOpen: false,
      previewImgUrl: "",
      name: "",
      address: "",
      errors: {},
      selectedClinic: "",
      listClinic: [],
      listDetailClinic: [],
      detailClinic: {},
    };
  }

  async componentDidMount() {
    let res = await getListClinicHome();
    if (res && res.errCode === 0) {
      const dataSelect = this.buildDataInputSelect(res.data);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevState.selectedClinic !== this.state.selectedClinic) {
      let id = this.state.selectedClinic.value;
      this.getDetailClinic(id);
    }
    if (prevState.detailClinic !== this.state.detailClinic) {
      this.fillDatainput(this.state.detailClinic);
    }
  }
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
    this.setState({
      selectedClinic: selectedOption,
    });
  };

  getDetailClinic = async (id) => {
    const res = await getDetailClinic(id);
    if (res && res.errCode === 0)
      this.setState({
        detailClinic: res.data,
      });
  };
  fillDatainput = (data) => {
    if (!_.isEmpty(data)) {
      this.setState({
        name: data.name,
        address: data.address,
        previewImgUrl: data.image,
        contentMarkdown: data.contentMarkdown,
        contentHTML: data.contentHTML,
      });
    }
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
      contentHTML: text,
      contentMarkdown: html,
    });
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    copyState.errors[id] = "";
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
      if (!address) errors.address = "Address must be entered";
      if (!contentMarkdown)
        errors.contentMarkdown = "Details clinic must be entered";
    } else {
      if (!image) errors.image = "Tải ảnh phòng khám";
      if (!name) errors.name = "Tên không được bỏ trống";
      if (!address) errors.address = "Địa chỉ không được bỏ trống";
      if (!contentMarkdown)
        errors.contentMarkdown = "Chi tiết phòng khám không được bỏ trống";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
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
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      name: this.state.name,
      address: this.state.address,
    };
    if (_.isEmpty(this.state.selectedClinic)) {
      const res = await createANewClinic(data);
      if (res && res.errCode === 0) {
        toast.success("create a new alinic succeed");
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          name: "",
          image: "",
          previewImgUrl: "",
          address: "",
          selectedClinic: "",
        });
      } else {
        toast.error("create a new alinic failed");
      }
    } else {
      const res = await updateClinic(data);
      if (res && res.errCode === 0) {
        toast.success("update alinic succeed");
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          name: "",
          image: "",
          previewImgUrl: "",
          address: "",
          selectedClinic: "",
        });
      } else {
        toast.error("update alinic failed");
      }
    }
  };
  render() {
    const { language } = this.props;
    let { errors } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-clinic.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="col-6 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              </span>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleChangeSelect}
                options={this.state.listClinic}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                }
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-clinic.name" />
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
            <div className="col-6 form-group mb-3">
              <label>
                <FormattedMessage id="admin.manage-clinic.address" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
              {errors.address && (
                <span className="text-danger">{errors.address}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-clinic.image" />
              </label>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
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
                  onClick={() => this.openReviewImage()}
                ></div>
              </div>
              {errors.image && (
                <span className="text-danger">{errors.image}</span>
              )}
            </div>

            <div className="col-12 form-group">
              <FormattedMessage id="admin.manage-clinic.details" />
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentHTML}
              />
              {errors.contentMarkdown && (
                <span className="text-danger">{errors.contentMarkdown}</span>
              )}
            </div>
            <button
              className={
                this.state.selectedClinic
                  ? "btn btn-primary mt-5"
                  : "btn btn-warning mt-5"
              }
              onClick={() => {
                this.handleSave();
              }}
            >
              {this.state.selectedClinic ? (
                <FormattedMessage id="admin.manage-clinic.save" />
              ) : (
                <FormattedMessage id="admin.manage-clinic.add" />
              )}
            </button>
          </div>
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
    // listClinic: state.admin.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getListClinicAdmin: () => dispatch(actions.getListClinicAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
