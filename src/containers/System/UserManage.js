import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsersService,
  createNewUserService,
} from "../../services/userService";
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

  createNewUser = async (data) => {
    try {
      const responce = await createNewUserService(data);
      console.log(
        "🚀 ~ file: UserManage.js ~ line 47 ~ UserManage ~ createNewUser= ~ responce",
        responce
      );
      if (responce && responce.errCode !== 0) {
        alert(responce.message);
      } else {
        await this.getAllUsersFormReact();
        this.setState({
          isOpenModal: !this.state.isOpenModal,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UserManage.js ~ line 46 ~ UserManage ~ createNewUser= ~ error",
        error
      );
    }
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
                        <button className="btn btn-edit" onClick={() => {}}>
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn btn-delete" onClick={() => {}}>
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
