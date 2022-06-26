import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { languages } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils/constant";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: null,
      description: "",
      doctors: [],
      hasOldData: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctors !== this.props.doctors) {
      let listDoctor = this.props.doctors;
      const dataSelect = this.buildDataInputSelect(listDoctor.data);
      this.setState({
        doctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let listDoctor = this.props.doctors;
      const dataSelect = this.buildDataInputSelect(listDoctor.data);
      this.setState({
        doctors: dataSelect,
      });
    }
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }

  buildDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let lableVi = `${item.firstName} ${item.lastName}`;
        let lableEn = `${item.lastName} ${item.firstName}`;
        let object = {
          label: language === languages.VI ? lableVi : lableEn,
          value: item.id,
        };
        result.push(object);
      });
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
      doctorId: this.state.selectedOption.value,
      description: this.state.description,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    };
    this.props.createDetailDoctor(data);
    this.props.fetchAllDoctor();
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: null,
      description: "",
      doctors: [],
    });
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });

    const res = await getDetailInfoDoctor(selectedOption.value);
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
    const { selectedOption, doctors, hasOldData } = this.state;
    return (
      <>
        <div className="doctor-title title mb-5">create doctor imformation</div>
        <div className="doctor-container wrapper">
          <div className="doctor-more-info ">
            <div className="content-left">
              <h4>Chọn bác sĩ</h4>
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={doctors}
              />
            </div>
            <div className="content-right">
              <h4>Thông tin giới thiệu</h4>
              <textarea
                rows="5"
                value={this.state.description}
                // onChange={(event) => this.handleChangeTextArea(event)}
                onChange={this.handleChangeTextArea}
              ></textarea>
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
            {hasOldData ? "Lưu thông tin" : "Tạo thông tin"}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctors: state.admin.doctors,
    // detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
    // fetchDetaiInfoDoctor: (id) => dispatch(actions.fetchDetaiInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
