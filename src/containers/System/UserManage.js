import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
import "./UserManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
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

  render() {
    const arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="title text-center">Manage User With Manh Hung</div>
        <div className="users-table">
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
