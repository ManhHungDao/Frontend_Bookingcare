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
import { getDetailInfoDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, TYPE } from "../../../utils/constant";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
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
            value: item.id,
          };
          result.push(object);
        });
      }
    }
    return result;
  };

  handleChangeTextArea = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: text,
      contentMarkdown: html,
    });
  };
  handleSaveContentMarkDown = () => {
    let hasOldData = this.state.hasOldData;
    const data = {
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedDoctor.value,
      description: this.state.description,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    };
    this.props.createDetailDoctor(data);
    this.props.fetchAllDoctor();
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: null,
      description: "",
      listDoctor: [],
    });
  };
  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });

    const res = await getDetailInfoDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data.Markdown) {
      const markdown = res.data.Markdown;
      if (
        markdown.contentHTML &&
        markdown.contentMarkdown &&
        markdown.description
      ) {
        this.setState({
          contentHTML: markdown.contentHTML,
          contentMarkdown: markdown.contentMarkdown,
          description: markdown.description,
          hasOldData: true,
        });
      } else {
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          description: "",
          hasOldData: false,
        });
      }
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  render() {
    const { selectedDoctor, listDoctor, hasOldData } = this.state;
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
                onChange={this.handleChange}
                options={listDoctor}
                placeholder={
                  language === languages.VI ? "Chọn bác sĩ..." : "Select..."
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
                onChange={this.handleChangeTextArea}
              ></textarea>
            </div>
          </div>
          <div className="sub-doctor-info row">
            <div className="col-4 form-group">
              <label>Chọn giá</label>
              <input className="form-control" />
            </div>
            <div className="col-4 form-group">
              <label>Chọn phương thức thanh toán</label>
              <input className="form-control" />
            </div>
            <div className="col-4 form-group">
              <label>Chọn tỉnh thành</label>
              <input className="form-control" />
            </div>
            <div className="col-4 form-group">
              <label>Tên phòng khám</label>
              <input className="form-control mb-3" />
            </div>
            <div className="col-4 form-group">
              <label>Địa chỉ phòng khám</label>
              <input className="form-control mb-3" />
            </div>
            <div className="col-4 form-group">
              <label>Ghi chú</label>
              <input className="form-control mb-3" />
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
            onClick={this.handleSaveContentMarkDown}
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
    // detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
    createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
