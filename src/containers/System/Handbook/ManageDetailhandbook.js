import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDetailhandbook.scss";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";
import { CommonUtils } from "../../../utils";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  deleteDetailHandbook,
  updateDetailHandbook,
  createDetailHandbook,
  getListHandbook,
} from "../../../services/userService";
import TableManage from "../TableManage";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";

class ManageDetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      previewImgUrl: "",
      note: "",
      image: "",
      content: "",
      selectedHandbook: "",
      listHandbook: "",
      idEditDetailHandbook: "",
      isSearch: false,
      listDetailHandbook: [],
      listDetailHandbookSearch: [],
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
    if (this.state.selectedHandbook !== prevState.selectedHandbook) {
      const handbookId = this.state.selectedHandbook.value;
      this.props.getListDetialHandbook(handbookId);
    }
    if (this.props.listDetailHandbook !== prevState.listDetailHandbook) {
      this.setState({
        listDetailHandbook: this.props.listDetailHandbook,
        listDetailHandbookSearch: this.props.listDetailHandbook,
      });
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
    this.setState({
      ...copyState,
    });
  };
  handleOpenSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch,
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
    this.clearState();
    this.setState({
      selectedHandbook: selectedOption,
    });
  };
  clearState = () => {
    this.setState({
      title: "",
      note: "",
      image: "",
      previewImgUrl: "",
      content: "",
      idEditDetailHandbook: "",
    });
  };
  fillDataInput = (data) => {
    this.setState({
      title: data.title,
      note: data.note,
      image: data.image,
      previewImgUrl: data.image,
      content: data.content,
    });
  };
  handleSearch = (input) => {
    let dataSearch = this.state.listDetailHandbook;
    if (input === "")
      this.setState({
        listDetailHandbookSearch: this.state.listDetailHandbook,
      });
    dataSearch = dataSearch.filter((e) => {
      return e.title.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      listDetailHandbookSearch: dataSearch,
    });
  };
  deleteClinic = async (id) => {
    const res = await deleteDetailHandbook(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Detail Handbook Succeed");
      this.props.getListDetialHandbook(this.state.selectedHandbook.value);
    } else toast.error("Delete Detail Handbook Failed");
  };
  editClinic = (data) => {
    this.fillDataInput(data);
    this.setState({
      idEditDetailHandbook: data.id,
    });
  };
  handleSave = async () => {
    const data = {
      title: this.state.title,
      note: this.state.note,
      content: this.state.content,
      image: this.state.image,
    };
    if (!this.state.idEditDetailHandbook) {
      const res = await createDetailHandbook({
        ...data,
        handbookId: this.state.selectedHandbook.value,
      });
      if (res && res.errCode === 0) {
        toast.success("Create Detail Handbook Succeed");
        this.clearState();
      } else toast.error("Create Detail Handbook Failed");
    } else {
      const res = await updateDetailHandbook({
        ...data,
        id: this.state.idEditDetailHandbook,
      });
      if (res && res.errCode === 0) {
        toast.success("Update Detail Handbook Succeed");
      } else toast.error("Update Detail Handbook Failed");
    }
    this.props.getListDetialHandbook(this.state.selectedHandbook.value);
  };
  handleChangeEditor = (content) => {
    this.setState({
      content,
    });
  };
  render() {
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
                id="previewImgUrl"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <label>
                <FormattedMessage id="admin.manage-detail-handbook.image" />
              </label>
              <div className="preview-img-container">
                <label className="lable-upload" htmlFor="previewImgUrl">
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
            <div className="col-12 form-group" id="note">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleChangeEditor}
              />
            </div>
            <div className="col-12 form-group mt-5">
              <FormattedMessage id="admin.manage-doctor.detail" />
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleChangeEditor}
              />
              <button
                className={
                  this.state.idEditDetailHandbook
                    ? "btn btn-primary mt-3 "
                    : "btn btn-warning mt-3 "
                }
                onClick={() => this.handleSave()}
              >
                {this.state.idEditDetailHandbook ? (
                  <FormattedMessage id="admin.manage-clinic.save" />
                ) : (
                  <FormattedMessage id="admin.manage-clinic.add" />
                )}
              </button>
              <TableManage
                listRender={this.state.listDetailHandbookSearch}
                handleEdit={this.editClinic}
                handleDelete={this.deleteClinic}
                handleSearch={this.handleSearch}
                handleOpenSearch={this.handleOpenSearch}
                isSearch={this.state.isSearch}
              />
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
    listDetailHandbook: state.admin.listDetailHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDetialHandbook: (id) => dispatch(actions.getListDetialHandbook(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDetailHandbook);
