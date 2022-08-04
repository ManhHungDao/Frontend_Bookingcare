import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./TableManageHandbook.scss";
import { FormattedMessage } from "react-intl";
import { getListDetailHandbook } from "../../../services/userService";
import { toast } from "react-toastify";

class TableManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDetialHandbook: [],
    };
  }

  componentDidMount() {
    // if (this.props.handbookId)
    //   this.props.getListDetialHandbook(this.props.handbookId);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.handbookId !== prevProps.handbookId) {
      this.props.getListDetialHandbook(this.props.handbookId);
    }
    if (this.props.listDetailHandbook !== prevProps.listDetailHandbook) {
      this.setState({
        listDetialHandbook: this.props.listDetailHandbook,
      });
    }
  }
  handleDeleteClinic = (id) => {
    this.props.deleteClinic(id);
  };
  handleEditClinic = (data) => {
    this.props.editClinic(data);
  };
  render() {
    const { language } = this.props;
    const { listDetialHandbook } = this.state;
    return (
      <>
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
            {listDetialHandbook &&
              listDetialHandbook.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          this.handleEditClinic(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          this.handleDeleteClinic(item.id);
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDetailHandbook: state.admin.listDetailHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDetialHandbook: (id) => dispatch(actions.getListDetialHandbook(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageHandbook);
