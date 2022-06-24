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
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: null,
      description: "",
      doctors: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
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
    console.log(event.target.value);
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
    
    const data = {
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedOption.value,
      description: this.state.description,
    };
    console.log("🚀 ~ file: ManageDoctor.js ~ line 88 ~ TableManageUser ~ data", data)
    this.props.createDetailDoctor(data);
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;
    const { doctors } = this.state;
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
            />
          </div>
          <button
            className="btn btn-primary mt-5"
            onClick={this.handleSaveContentMarkDown}
          >
            Lưu thông tin
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
