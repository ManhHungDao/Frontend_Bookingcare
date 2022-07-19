import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }
   componentDidMount() {
   this.props.getListClinicHome();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        listClinic: this.props.listClinic,
      });
    }
  }

  handleDeleteClinic = (id) => {
    this.props.deleteClinic(id);
  };
  handleEditClinic = (userData) => {
    this.props.editClinic(userData);
  };
  render() {
    const { listClinic } = this.state;
    return (
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <div className="clinic-container">
          <div className="clinic-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th className="col-2">
                    <FormattedMessage id="admin.manage-clinic.name" />
                  </th>
                  <th className="col-3">
                    <FormattedMessage id="admin.manage-clinic.address" />
                  </th>
                  <th className="col-1">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listClinic &&
                  listClinic.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    // deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
