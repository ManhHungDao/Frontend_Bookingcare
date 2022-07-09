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
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

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
    this.setState({
      ...copyState,
    });
  };
  handleSave = () => {
    const data = {
      image: this.state.image,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      name: this.state.name,
    };
    this.props.createASpecialty(data);
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      name: "",
      image: "",
      previewImgUrl: "",
    });
  };
  render() {
    const { language } = this.props;

    return (
      <>
        <div className="specialty-title title mb-3">
          {/* <FormattedMessage id="admin.manage-doctor.title" />
           */}
          Quản lý chuyên khoa
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                {/* <FormattedMessage id="patient.booking-modal.name" /> */}
                tên chuyên khoa
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "name")}
                value={this.state.name}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-user.avatar" />
              </label>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <div className="preview-img-container">
                <label className="lable-upload" htmlFor="previewImg">
                  Tải ảnh
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
            </div>
            <div className="col-12 form-group">
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentHTML}
              />
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
  return {
    createASpecialty: (data) => dispatch(actions.createASpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
