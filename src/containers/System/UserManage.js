import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsersService,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import "./UserManage.scss";
import ModelUser from "./ModelUser";
import { emitter } from "../../utils/emitter";
import ModelEditUser from "./ModelEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    this.getAllUsersFormReact();
  }

  getAllUsersFormReact = async () => {
    let responce = await getAllUsersService("All");
    if (responce && responce.errCode === 0) {
      this.setState({
        arrUsers: responce.user,
      });
    }
  };

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

  toggleUserEditModel = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  createNewUser = async (data) => {
    try {
      const responce = await createNewUserService(data);
      if (responce && responce.errCode !== 0) {
        alert(responce.message);
      } else {
        await this.getAllUsersFormReact();
        this.setState({
          isOpenModal: false,
        });
        // emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UserManage.js ~ line 46 ~ UserManage ~ createNewUser= ~ error",
        error
      );
    }
  };

  handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUserService(userId);
      if (response && response.errCode === 0) {
        this.getAllUsersFormReact();
        this.setState({
          isOpenEditModal: false,
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UserManage.js ~ line 73 ~ UserManage ~ handleDeleteUser ~ error",
        error
      );
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: { ...user },
    });
  };

  doEditUser = async (user) => {
    try {
      const res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.getAllUsersFormReact();
        this.setState({
          isOpenEditModal: false,
        });
      } else {
        alert(res.message);
      }
    } catch (error) {}
  };

  render() {
    const arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModelUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModel}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEditModal && (
          <ModelEditUser
            isOpen={this.state.isOpenEditModal}
            toggleFromParent={this.toggleUserEditModel}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
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
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item.id);
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
