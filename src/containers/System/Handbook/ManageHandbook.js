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
      idEdit: "",
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
  render() {
    const { listHandbook } = this.state;
    return (
      <>
        <div className="title">Manage handbook</div>
        <div className="handbook-container wrapper">
          <div className="add-info mb-5">
            <label className="name">name</label>
            <input
              className="input-name form-control"
              onChange={(event) => this.handleOnChangeName(event)}
              value={this.state.name}
            />
            <div>
              <button
                className="btn btn-primary"
                onClick={() => this.handleSave()}
                disabled={!this.state.name ? "disabled" : false}
              >
                add new
              </button>
            </div>
          </div>
          <div className="list-handbook">
            <table id="customers">
              <thead>
                <tr>
                  <th className="col-2">
                    <FormattedMessage id="admin.manage-clinic.name" />
                  </th>
                  <th className="col-1">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listHandbook &&
                  listHandbook.map((item, index) => {
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
