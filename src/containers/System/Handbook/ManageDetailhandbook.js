import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDetailhandbook.scss";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";
import { languages, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import { toast } from "react-toastify";
import Select from "react-select";
import MdEditor from "react-markdown-editor-lite";
import { getListHandbook } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      references: "",
      title: "",
      previewImg: "",
      description: "",
      note: "",
      image: "",
      contentHTML: "",
      contentMarkdown: "",
      selectedHandbook: "",
      listHandbook: "",
    };
  }

  async componentDidMount() {
    const res = await getListHandbook();
    if (res && res.errCode === 0) {
      const listHandbook = this.buildDataInputSelect(res.data);
      this.setState({ listHandbook });
    } else {
      toast.error("Get List Handbook Failed");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
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
  handleChangeTextArea = (event, name) => {
    let copyState = { ...this.state };
    copyState[name] = event.target.value;
    // copyState.errors[name] = "";
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
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
  openReview = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedHandbook: selectedOption,
    });
  };
  render() {
    const { language } = this.props;

    return (
      <>
        <div className="title">
          <FormattedMessage id="admin.manage-detail-handbook.title" />
        </div>
        <div className="detail-handbook-container wrapper">
          <div className="row">
            <div className="col-12 form-group detail-header mb-3">
              <div className="row">
                <h4 className="name-select-handbook col-6">
                  {this.state.selectedHandbook
                    ? this.state.selectedHandbook.label
                    : ""}
                </h4>
                <div className="select-handbook col-4">
                  <Select
                    value={this.state.selectedHandbook}
                    onChange={this.handleChangeSelect}
                    options={this.state.listHandbook}
                    placeholder={
                      <FormattedMessage id="admin.manage-detail-handbook.placeholer" />
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-detail-handbook.name" />
              </label>
              <input
                className="form-control"
                value={this.state.title}
                onChange={(event) => {
                  this.handleChangeTextArea(event, "title");
                }}
              />
            </div>
            <div className="col-6 form-group">
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <label>
                <FormattedMessage id="admin.manage-detail-handbook.image" />
              </label>
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
                  onClick={() => this.openReview()}
                ></div>
              </div>
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                value={this.state.description}
                onChange={(event) =>
                  this.handleChangeTextArea(event, "description")
                }
              ></textarea>
              {/* {errors.description && (
                <span className="text-danger">{errors.description}</span>
              )} */}
            </div>
            <div className="col-6 form-group" id="note">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <textarea
                onChange={(event) => this.handleChangeTextArea(event, "note")}
                value={this.state.note}
              ></textarea>
            </div>
            <div className="col-12 form-group mt-5">
              <FormattedMessage id="admin.manage-detail-handbook.content" />
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
              {/* {errors.contentMarkdown && (
                <span className="text-danger">{errors.contentMarkdown}</span>
              )} */}
              <button className="btn btn-primary mt-3">
                <FormattedMessage id="admin.manage-clinic.save" />
              </button>
            </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDetailHandbook);
