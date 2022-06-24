import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// function handleEditorChange({ html, text }) {
//   console.log("handleEditorChange", html, text);
// }
// Finish!
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: null,
      description: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.users !== this.props.users) {
    //   this.setState({
    //     users: this.props.users,
    //   });
    // }
  }
  handleChangeTextAre = (event) => {
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
    console.log(this.state);
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

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
                options={options}
              />
            </div>
            <div className="content-right">
              <h4>Thông tin giới thiệu</h4>
              <textarea
                rows="5"
                value={this.state.description}
                // onChange={(event) => this.handleChangeTextAre(event)}
                onChange={this.handleChangeTextAre}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
