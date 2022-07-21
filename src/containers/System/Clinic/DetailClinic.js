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
import _ from "lodash";
import TableManageClinic from "./TableManageClinic";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "noteHTML", label: "Note" },
  { value: "bookingHTML", label: "Detail Booking" },
  { value: "strengthHTML", label: "Detail Strengths" },
  { value: "equipmentHTML", label: "Detail Equipment" },
  { value: "serviceHTML", label: "Detail Services" },
  { value: "locationHTML", label: "Detail Location" },
  { value: "examinationHTML", label: "Detail Examination" },
];

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
      selectedClinic: "",
      listClinic: [],
      listDetailClinic: [],
      //
      isShowDetailMarkdown: false,
      selectedDetailValue: "",
      details: {
        bookingMarkdown: "",
        bookingHTML: "",
        noteMarkdown: "",
        noteHTML: "",
        strengthMarkdown: "",
        strengthHTML: "",
        equipmentMarkdown: "",
        equipmentHTML: "",
        serviceMarkdown: "",
        serviceHTML: "",
        locationMarkdown: "",
        locationHTML: "",
        examinationMarkdown: "",
        examinationHTML: "",
      },
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
    let details = {
      bookingMarkdown: data.bookingMarkdown ? data.bookingMarkdown : "",
      bookingHTML: data.bookingHTML ? data.bookingHTML : "",
      noteMarkdown: data.noteMarkdown ? data.noteMarkdown : "",
      noteHTML: data.noteHTML ? data.noteHTML : "",
      strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : "",
      strengthHTML: data.strengthHTML ? data.strengthHTML : "",
      equipmentMarkdown: data.equipmentMarkdown ? data.equipmentMarkdown : "",
      equipmentHTML: data.equipmentHTML ? data.equipmentHTML : "",
      serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : "",
      serviceHTML: data.serviceHTML ? data.serviceHTML : "",
      locationMarkdown: data.locationMarkdown ? data.locationMarkdown : "",
      locationHTML: data.locationHTML ? data.locationHTML : "",
      examinationMarkdown: data.examinationMarkdown
        ? data.examinationMarkdown
        : "",
      examinationHTML: data.examinationHTML ? data.examinationHTML : "",
    };
    this.setState({
      details: { ...details },
    });
  };
  clearState = () => {
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
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

  handleEditorChange = ({ html, text }) => {
    let { details } = this.state;
    const select = this.state.selectedDetailValue;
    if (select === "bookingHTML") {
      details[select] = text;
      details["bookingHTML"] = html;
    }
    if (select === "noteHTML") {
      details[select] = text;
      details["noteHTML"] = html;
    }
    if (select === "strengthHTML") {
      details[select] = text;
      details["strengthHTML"] = html;
    }
    if (select === "equipmentHTML") {
      details[select] = text;
      details["equipmentHTML"] = html;
    }
    if (select === "serviceHTML") {
      details[select] = text;
      details["serviceHTML"] = html;
    }
    if (select === "locationHTML") {
      details[select] = text;
      details["locationHTML"] = html;
    }
    if (select === "examinationHTML") {
      details[select] = text;
      details["examinationHTML"] = html;
    }
    this.setState({
      contentHTML: text,
      contentMarkdown: html,
      details: { ...details },
    });
  };
  handleChangeSelectDetail = (selectedOption) => {
    this.setState({
      isShowDetailMarkdown: true,
      selectedDetailValue: selectedOption.value,
      contentHTML: "",
      contentMarkdown: "",
    });
  };
  renderContentMarkdown = () => {
    let select = this.state.selectedDetailValue;
    let value = this.state.details[select];
    return (
      <>
        {this.state.isShowDetailMarkdown && (
          <>
            <MdEditor
              style={{ height: "fit-content" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentHTML}
            />
          </>
        )}
      </>
    );
  };

  handleSave = async () => {
    const clinicid = this.state.selectedClinic.value;
    const data = {
      id: clinicid,
      ...this.state.details,
    };
    this.props.createDetailClinic(data);
    this.clearState();
  };
  render() {
    let { selectedClinic } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-clinic.title" />
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
                />
              </div>
            </div>

            <div className="col-12 form-group">
              <div className="findDetails">
                <Select
                  // value={this.state.selectedClinic}
                  onChange={this.handleChangeSelectDetail}
                  options={options}
                  // placeholder={
                  //   <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                  // }
                  placeholder="add detail"
                />
              </div>
              {this.renderContentMarkdown()}
            </div>
            <button
              className="btn btn-primary mt-5"
              onClick={() => {
                this.handleSave();
              }}
              disabled={!this.state.selectedClinic ? "disabled" : false}
            >
              <FormattedMessage id="admin.manage-clinic.save" />
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
