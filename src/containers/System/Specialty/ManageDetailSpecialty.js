import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageDetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-image-lightbox/style.css";
import Select from "react-select";
import { toast } from "react-toastify";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  {
    value: "treatmentMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.treament" />,
  },
  {
    value: "strengthMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.trengths" />,
  },
  {
    value: "serviceMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.services" />,
  },
  {
    value: "examinationMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.examination" />,
  },
];

class ManageDetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClinic: "",
      listClinic: [],
      selectedSpecialty: "",
      listSpecialty: [],
      treatmentMarkdown: "",
      treatmentHTML: "",
      strengthMarkdown: "",
      strengthHTML: "",
      serviceMarkdown: "",
      serviceHTML: "",
      examinationMarkdown: "",
      examinationHTML: "",
    };
  }

  componentDidMount() {
    this.props.getListSpecialtyAdmin();
    this.props.getListClinicAdmin();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listSpecialtyAdmin !== prevProps.listSpecialtyAdmin) {
      const listSpecialtyAdmin = this.props.listSpecialtyAdmin;
      const dataSelect = this.buildDataInputSelect(listSpecialtyAdmin);
      this.setState({
        listSpecialty: dataSelect,
      });
    }
    if (this.props.listClinic !== prevProps.listClinic) {
      const listClinic = this.props.listClinic;
      const dataSelect = this.buildDataInputSelect(listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
  clearState = () => {
    this.setState({
      selectedSpecialty: "",
      treatmentMarkdown: "",
      treatmentHTML: "",
      strengthMarkdown: "",
      strengthHTML: "",
      serviceMarkdown: "",
      serviceHTML: "",
      examinationMarkdown: "",
      examinationHTML: "",
    });
  };
  fillDataInput = (data) => {
    this.clearState();
    if (!data) return;
    this.setState({
      treatmentMarkdown: data.treatmentMarkdown ? data.treatmentMarkdown : "",
      treatmentHTML: data.treatmentHTML ? data.treatmentHTML : "",
      strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : "",
      strengthHTML: data.strengthHTML ? data.strengthHTML : "",
      serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : "",
      serviceHTML: data.serviceHTML ? data.serviceHTML : "",
      examinationMarkdown: data.examinationMarkdown
        ? data.examinationMarkdown
        : "",
      examinationHTML: data.examinationHTML ? data.examinationHTML : "",
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
  handleEditorChange = ({ html, text }, name) => {
    if (name === "treatmentMarkdown")
      this.setState({
        treatmentHTML: html,
        treatmentMarkdown: text,
      });
    if (name === "strengthMarkdown")
      this.setState({
        strengthHTML: html,
        strengthMarkdown: text,
      });
    if (name === "serviceMarkdown")
      this.setState({
        serviceHTML: html,
        serviceMarkdown: text,
      });
    if (name === "examinationMarkdown")
      this.setState({
        examinationHTML: html,
        examinationMarkdown: text,
      });
  };
  renderContentMarkdown = () => {
    return (
      <>
        {options.map((item, index) => {
          let value = item.value;
          return (
            <div key={index} className="mt-3">
              <span> {item.label}</span>
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={({ html, text }) => {
                  this.handleEditorChange({ html, text }, item.value);
                }}
                value={this.state[value]}
              />
            </div>
          );
        })}
      </>
    );
  };
  handleChangeSelect = (selectedOption, name) => {
    const stateName = name.name;
    const copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  render() {
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-detail-specialty.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="header-manage">
              <div className="find-option">
                <div className="find-clinic">
                  <Select
                    name="selectedClinic"
                    value={this.state.selectedClinic}
                    onChange={this.handleChangeSelect}
                    options={this.state.listClinic}
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                    }
                  />
                </div>
                <div className="find-specialty">
                  <Select
                    name="selectedSpecialty"
                    value={this.state.selectedSpecialty}
                    onChange={this.handleChangeSelect}
                    options={this.state.listSpecialty}
                    isDisabled={!this.state.selectedClinic ? true : ""}
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.select_specialty_placeholder" />
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-12 form-group">
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
    listSpecialtyAdmin: state.admin.listSpecialtyAdmin,
    listClinic: state.admin.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSpecialtyAdmin: () => dispatch(actions.getListSpecialtyAdmin()),
    getListClinicAdmin: () => dispatch(actions.getListClinicAdmin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDetailSpecialty);
