import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDetailClinic.scss";
import { FormattedMessage } from "react-intl";
import "react-image-lightbox/style.css";
import Select from "react-select";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClinic: "",
      listClinic: [],
      content: "",
      noteContent: "",
    };
  }

  componentDidMount() {
    this.props.getListClinicHome();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.detailClinic !== prevProps.detailClinic) {
      this.fillDataInput(this.props.detailClinic);
    }

    if (this.props.listClinic !== prevProps.listClinic) {
      const dataSelect = this.buildDataInputSelect(this.props.listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
  fillDataInput = (data) => {
    this.clearState();
    if (!data) return;
    this.setState({
      content: data.content ? data.content : "",
      noteContent: data.noteContent ? data.noteContent : "",
    });
  };
  clearState = () => {
    this.setState({
      content: "",
      noteContent: "",
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

  handleChangeSelectClinic = (selectedOption) => {
    this.props.getDetailClinic(selectedOption.value);
    this.setState({
      selectedClinic: selectedOption,
    });
  };

  handleSave = async () => {
    let clinicid = this.state.selectedClinic.value;
    this.props.createDetailClinic({
      id: clinicid,
      content: this.state.content,
      noteContent: this.state.noteContent,
    });
    this.clearState();
  };
  handleChangeContent = (noteContent) => {
    this.setState({
      noteContent,
    });
  };
  handleChangeNoteContent = (content) => {
    this.setState({
      content,
    });
  };
  render() {
    let { selectedClinic } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-detail-clinic.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="header-manage">
              <h4 className="header-title">
                {selectedClinic ? selectedClinic.label : ""}
              </h4>
              <div className="find-clinic">
                <Select
                  value={this.state.selectedClinic}
                  onChange={this.handleChangeSelectClinic}
                  options={this.state.listClinic}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                  }
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              </div>
            </div>
            <div className="col-12 form-group mt-3">
              <FormattedMessage id="admin.manage-doctor.note" />
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleChangeNoteContent}
              />
            </div>
            <div className="col-12 form-group mt-3">
              <FormattedMessage id="admin.manage-doctor.detail" />
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleChangeContent}
              />
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  this.handleSave();
                }}
                disabled={!this.state.selectedClinic ? "disabled" : false}
              >
                <FormattedMessage id="admin.manage-clinic.save" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listClinic: state.admin.listClinicHome,
    detailClinic: state.admin.detailClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getDetailClinic: (id) => dispatch(actions.getDetailClinic(id)),
    createDetailClinic: (data) => dispatch(actions.createDetailClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
