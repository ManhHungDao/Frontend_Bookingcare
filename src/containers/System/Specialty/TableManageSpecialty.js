import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageSpecialty.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }
  componentDidMount() {
    this.props.getListClinicHome();
    this.props.getListSpecialtyByClinicId("All");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.clinicId !== this.props.clinicId) {
      this.props.getListSpecialtyByClinicId(this.props.clinicId);
    }
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      this.setState({
        listSpecialty: this.props.listSpecialty,
      });
    }
  }

  handleDeleteSpecialty = (id) => {
    this.props.deleteSpecialty(id);
  };
  handleEditSpecialty = (data) => {
    this.props.editSpecialty(data);
  };
  render() {
    const { listSpecialty } = this.state;
    return (
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <div className="clinic-container">
          <div className="clinic-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th className="col-2">
                    <FormattedMessage id="admin.manage-specialty.name" />
                  </th>
                  {/* <th className="col-3">
                    <FormattedMessage id="admin.manage-clinic.address" />
                  </th> */}
                  <th className="col-1">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listSpecialty &&
                  listSpecialty.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        {/* <td>{item.address}</td> */}
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => {
                              this.handleEditSpecialty(item);
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              this.handleDeleteSpecialty(item.id);
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
    listSpecialty: state.admin.listSpecialtyByClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
