import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, TYPE } from "../../../utils/constant";
import _ from "lodash";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      // save to markdown table
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      hasOldData: false,
      listDoctor: [],
      selectedDoctor: null,

      // save to doctor info table
      listPrice: [],
      selectedPrice: null,
      listPayment: [],
      selectedPayment: null,
      listProvince: [],
      selectedProvince: null,
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchInfoDoctor(TYPE.PAYMENT);
    this.props.fetchInfoDoctor(TYPE.PRICE);
    this.props.fetchInfoDoctor(TYPE.PROVINCE);
    // this.props.fetchSubDetaiInfoDoctor(15);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      const detailDoctor = this.props.detailDoctor;
      this.setState({
        detailDoctor: detailDoctor,
      });
      // set state first select
      const { Markdown, Doctor_Info } = detailDoctor;
      this.fillDateState(detailDoctor, Markdown, Doctor_Info);
    }

    if (prevProps.listDoctor !== this.props.listDoctor) {
      let listDoctor = this.props.listDoctor;
      const dataSelect = this.buildDataInputSelect(listDoctor.data, 1);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.listPrice !== this.props.listPrice) {
      let listPrice = this.props.listPrice;
      const dataSelect = this.buildDataInputSelect(listPrice, 0);
      this.setState({
        listPrice: dataSelect,
      });
    }
    if (prevProps.listPayment !== this.props.listPayment) {
      let listPayment = this.props.listPayment;
      const dataSelect = this.buildDataInputSelect(listPayment, 0);
      this.setState({
        listPayment: dataSelect,
      });
    }
    if (prevProps.listProvince !== this.props.listProvince) {
      let listProvince = this.props.listProvince;
      const dataSelect = this.buildDataInputSelect(listProvince, 0);
      this.setState({
        listProvince: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let { listDoctor, listPrice, listPayment, listProvince } = this.props;
      const dataSelectDoctor = this.buildDataInputSelect(listDoctor.data, 1);
      const dataSelectPayment = this.buildDataInputSelect(listPayment, 0);
      const dataSelectProvince = this.buildDataInputSelect(listProvince, 0);
      const dataSelectPrice = this.buildDataInputSelect(listPrice, 0);
      this.setState({
        listDoctor: dataSelectDoctor,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listPrice: dataSelectPrice,
      });
    }
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }

  buildDataInputSelect = (data, key) => {
    let result = [];
    let { language } = this.props;

    if (data && data.length > 0) {
      let lableVi, lableEn, object;
      if (key === 1) {
        data.forEach((item) => {
          lableVi = `${item.firstName} ${item.lastName}`;
          lableEn = `${item.lastName} ${item.firstName}`;
          object = {
            label: language === languages.VI ? lableVi : lableEn,
            value: item.id,
          };
          result.push(object);
        });
      } else {
        data.forEach((item) => {
          lableVi = `${item.valueVI}`;
          lableEn = `${item.valueEN}`;
          object = {
            label: language === languages.VI ? lableVi : lableEn,
            value: item.keyMap,
          };
          result.push(object);
        });
      }
    }
    return result;
  };

  handleChangeTextArea = (event, name) => {
    const copyState = { ...this.state };
    copyState[name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: text,
      contentMarkdown: html,
    });
  };
  handleSaveContent = () => {
    let hasOldData = this.state.hasOldData;
    const dataMain = {
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedDoctor.value,
      description: this.state.description,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    };
    const subData = {
      doctorId: this.state.selectedDoctor.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    };
    this.props.createDetailDoctor(dataMain);
    this.props.createSubDetailDoctor(subData);
    this.props.fetchAllDoctor();
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: null,
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      note: "",
      description: "",
      nameClinic: "",
      addressClinic: "",
      listDoctor: [],
      hasOldData: false,
    });
  };

  fillDateState = (detailDoctor, Markdown, Doctor_Info) => {
    let contentHTML = "",
      contentMarkdown = "",
      description = "",
      addressClinic = "",
      nameClinic = "",
      note = "",
      selectedPrice = "",
      selectedPayment = "",
      selectedProvince = "";
    const { listPayment, listPrice, listProvince } = this.state;
    if (detailDoctor) {
      if (
        Markdown &&
        Markdown.contentHTML &&
        Markdown.contentMarkdown &&
        Markdown.description
      ) {
        contentHTML = Markdown.contentHTML;
        contentMarkdown = Markdown.contentMarkdown;
        description = Markdown.description;
      }
      if (
        Doctor_Info &&
        Doctor_Info.addressClinic &&
        Doctor_Info.nameClinic &&
        Doctor_Info.note &&
        Doctor_Info.paymentId &&
        Doctor_Info.priceId &&
        Doctor_Info.provinceId
      ) {
        addressClinic = Doctor_Info.addressClinic;
        nameClinic = Doctor_Info.nameClinic;
        note = Doctor_Info.note;
        const { priceId, provinceId, paymentId } = Doctor_Info;
        selectedPayment = listPayment.find((i) => i && i.value === paymentId);
        selectedPrice = listPrice.find((i) => i && i.value === priceId);
        selectedProvince = listProvince.find(
          (i) => i && i.value === provinceId
        );
      }
      this.setState({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        note: note,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice: null,
        selectedPayment: null,
        selectedProvince: null,
        hasOldData: false,
      });
    }
  };

  handleChangeSelect = (selectedDoctor) => {
    // set state select doctor
    this.setState({ selectedDoctor });
    // call api fetch detail doctor service
    this.props.fetchDetaiInfoDoctor(selectedDoctor.value);

    const { detailDoctor } = this.state;
    const { Markdown, Doctor_Info } = detailDoctor;
    this.fillDateState(detailDoctor, Markdown, Doctor_Info);
  };

  handleChangeSelectMoreInfo = (selectedOption, name) => {
    const stateName = name.name;
    const copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  render() {
    const {
      selectedDoctor,
      selectedPrice,
      selectedProvince,
      selectedPayment,
      listDoctor,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
    } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="doctor-title title mb-5">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="doctor-container wrapper">
          <div className="doctor-info">
            <div className="content-left">
              <h4>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </h4>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={listDoctor}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_doctor_placeholder" />
                }
              />
            </div>
            <div className="content-right">
              <h4>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </h4>
              <textarea
                value={this.state.description}
                // onChange={(event) => this.handleChangeTextArea(event)}
                onChange={(event) =>
                  this.handleChangeTextArea(event, "description")
                }
                // placeholder={
                //   language === languages.VI
                //     ? "Lời giới thiệu"
                //     : "Introduce about doctor"
                // }
              ></textarea>
            </div>
          </div>
          <div className="sub-doctor-info row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-price" />
              </label>
              <Select
                name="selectedPrice"
                value={selectedPrice}
                onChange={this.handleChangeSelectMoreInfo}
                options={listPrice}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_price_placeholder" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-payment" />
              </label>
              <Select
                name="selectedPayment"
                value={selectedPayment}
                onChange={this.handleChangeSelectMoreInfo}
                options={listPayment}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_payment_placeholder" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-province" />
              </label>
              <Select
                name="selectedProvince"
                value={selectedProvince}
                onChange={this.handleChangeSelectMoreInfo}
                options={listProvince}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_province_placeholder" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.name-clinic" />
              </label>
              <input
                className="form-control mb-3"
                onChange={(event) =>
                  this.handleChangeTextArea(event, "nameClinic")
                }
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.address-clinic" />
              </label>
              <input
                className="form-control mb-3"
                onChange={(event) =>
                  this.handleChangeTextArea(event, "addressClinic")
                }
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                className="form-control mb-3"
                onChange={(event) => this.handleChangeTextArea(event, "note")}
                value={this.state.note}
              />
            </div>
          </div>

          <div className="doctor-editor">
            <MdEditor
              style={{ height: "fit-content" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentHTML}
            />
          </div>
          <button
            className={
              !hasOldData ? "btn btn-primary mt-5" : "btn btn-warning mt-5"
            }
            onClick={this.handleSaveContent}
          >
            {hasOldData ? (
              <FormattedMessage id="admin.manage-doctor.save" />
            ) : (
              <FormattedMessage id="admin.manage-doctor.create" />
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctor: state.admin.listDoctor,
    listPrice: state.admin.doctorPrice,
    listPayment: state.admin.doctorPayment,
    listProvince: state.admin.doctorProvince,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
    createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
    createSubDetailDoctor: (data) =>
      dispatch(actions.createSubDetailDoctor(data)),
    fetchDetaiInfoDoctor: (id) => dispatch(actions.fetchDetaiInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
