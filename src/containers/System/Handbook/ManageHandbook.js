import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ManageHandbook.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  deleteHandbook,
  getListHandbook,
  createAHandbook,
  editHandbook,
} from "../../../services/userService";
import _ from "lodash";

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      listHandbook: [],
      listHandbookSearch: [],
      idEdit: "",
      isSearch: false,
    };
  }
  async componentDidMount() {
    this.fetchListHandbook();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  fetchListHandbook = async () => {
    const res = await getListHandbook();
    if (res && res.errCode === 0)
      this.setState({
        listHandbook: res.data,
        listHandbookSearch: res.data,
      });
    else toast.error("Get List Handbook Failed");
  };
  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleSave = async () => {
    if (!this.state.idEdit) {
      const data = {
        name: this.state.name,
      };
      const res = await createAHandbook(data);
      if (res && res.errCode === 0) {
        this.setState({
          name: "",
          idEdit: "",
        });
        toast.success("Create Handbook Succeed");
        this.fetchListHandbook();
      } else toast.error("Create Handbook Failed");
    } else {
      const res = await editHandbook({
        name: this.state.name,
        id: this.state.idEdit,
      });
      if (res && res.errCode === 0) {
        this.setState({
          name: "",
          idEdit: "",
        });
        toast.success("Update Handbook Succeed");
        this.fetchListHandbook();
      } else toast.error("Update Handbook Failed");
    }
  };
  handleEdit = async (data) => {
    this.setState({ name: data.name, idEdit: data.id });
  };
  handleDelete = async (id) => {
    const res = await deleteHandbook(id);
    if (res && res.errCode === 0) {
      this.setState({
        name: "",
      });
      toast.success("Create Handbook Succeed");
      this.fetchListHandbook();
    } else toast.error("Update Handbook Failed");
  };
  handleSearch = (event) => {
    let input = event.target.value;
    let dataSearch = this.state.listHandbook;
    if (input === "")
      this.setState({
        listHandbookSearch: this.state.listHandbook,
      });
    dataSearch = dataSearch.filter((e) => {
      return e.name.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      listHandbookSearch: dataSearch,
    });
  };
  handleOpenSearch = () => [
    this.setState({
      isSearch: !this.state.isSearch,
    }),
  ];
  render() {
    const { listHandbookSearch } = this.state;
    const placeHolserSearch =
      this.props.language === languages.VI ? "Lọc cẩm nang" : "Filter handbook";
    return (
      <>
        <div className="title">
          <FormattedMessage id="admin.manage-handbook.title" />
        </div>
        <div className="handbook-container wrapper">
          <div className="add-info">
            <div className="name">
              <FormattedMessage id="admin.manage-handbook.name" />
            </div>
            <input
              className="input-name form-control"
              onChange={(event) => this.handleOnChangeName(event)}
              value={this.state.name}
            />
            <div>
              <button
                className="btn btn-primary "
                onClick={() => this.handleSave()}
                disabled={!this.state.name ? "disabled" : false}
              >
                <FormattedMessage id="admin.manage-handbook.save" />
              </button>
            </div>
          </div>
          <div className="list-handbook">
            <table id="customers">
              <thead>
                <tr>
                  <th className="col-2">
                    <div className="row-name">
                      <FormattedMessage id="admin.manage-handbook.name" />
                      <i
                        className="fas fa-search"
                        onClick={() => this.handleOpenSearch()}
                      ></i>
                    </div>
                    <input
                      className="search-input"
                      type={this.state.isSearch ? "" : "hidden"}
                      onChange={(event) => this.handleSearch(event)}
                    />
                  </th>
                  <th className="col-1">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listHandbookSearch &&
                  listHandbookSearch.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => {
                              this.handleEdit(item);
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              this.handleDelete(item.id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
