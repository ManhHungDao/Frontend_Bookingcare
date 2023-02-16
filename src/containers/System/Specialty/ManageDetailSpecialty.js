import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import "react-image-lightbox/style.css";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  createDetailSpecialty,
  getDetailSpecialty,
} from "../../../services/userService";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";

class ManageDetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClinic: "",
      listClinic: [],
      selectedSpecialty: "",
      listSpecialty: [],
      content: "",
    };
  }

  componentDidMount() {
    this.props.getListClinicAdmin();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listSpecialty !== prevProps.listSpecialty) {
      const listSpecialty = this.props.listSpecialty;
      const dataSelect = this.buildDataInputSelect(listSpecialty);
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
      content: "",
    });
  };
  fillDataInput = (data) => {
    this.clearState();
    if (!data) return;
    this.setState({
      content: data.content ? data.content : "",
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

  handleChangeSelectClinic = async (selectedOption) => {
    await this.props.getListSpecialtyByClinicId(selectedOption.value);
    this.setState({
      selectedClinic: selectedOption,
      selectedSpecialty: "",
    });
    this.clearState();
  };
  handleChangeSelectSpecialty = async (selectedOption) => {
    const specialtyId = selectedOption.value;
    const res = await getDetailSpecialty(specialtyId);
    if (res && res.errCode === 0) {
      this.fillDataInput(res.data);
    } else {
      toast.error("Get Detail Specialty Failed");
    }
    this.setState({
      selectedSpecialty: selectedOption,
    });
  };
  handleSave = async () => {
    const res = await createDetailSpecialty({ content: this.state.content });
    if (res && res.errCode === 0) {
      toast.success("Upload Detail Specialty Succeed");
      this.clearState();
    } else {
      toast.error("Upload Detail Specialty Failed");
    }
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
                <div className="find-specialty">
                  <Select
                    value={this.state.selectedSpecialty}
                    onChange={this.handleChangeSelectSpecialty}
                    options={this.state.listSpecialty}
                    isDisabled={!this.state.selectedClinic ? true : ""}
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.select_specialty_placeholder" />
                    }
                    styles={{
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 form-group mt-5">
              <FormattedMessage id="admin.manage-doctor.detail" />
              <CKEditorFieldBasic
                value={this.state.content}
                onChange={this.handleChangeEditor}
              />
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  this.handleSave();
                }}
                disabled={!this.state.selectedSpecialty ? "disabled" : false}
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
    listClinic: state.admin.listClinic,
    listSpecialty: state.admin.listSpecialtyByClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAdmin: () => dispatch(actions.getListClinicAction()),
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDetailSpecialty);
