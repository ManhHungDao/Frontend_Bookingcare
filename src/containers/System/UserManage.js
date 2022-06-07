import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
import "./UserManage.scss";
import ModelUser from "./ModelUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
    };
  }

  async componentDidMount() {
    let responce = await getAllUsers("All");
    if (responce && responce.errCode === 0) {
      this.setState({
        arrUsers: responce.user,
      });
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  toggleUserModel = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  render() {
    const arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModelUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModel}
        />
        <div className="title text-center">Manage User With Manh Hung</div>
        <div className="mx-1  ">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <>
                    <tr>
                      {" "}
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn btn-delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
