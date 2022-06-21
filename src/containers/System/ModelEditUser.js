import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModelEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "hashpassword",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    const user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        ...user,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let arrInput = ["firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++)
      if (!this.state[arrInput[i]]) {
        alert(`Missing parameters ${arrInput[i]}`);
        return false;
      }
    return true;
  };
  handleSaveUser = () => {
    const isValid = this.checkValidateInput();
    if (isValid) {
      // call api edit user
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.props.isOpen}>
        <ModalHeader toggle={() => this.toggle()}>Edit A New User</ModalHeader>
        <ModalBody>
          <form>
            <div className="row">
              <div className="col">
                Email
                <input
                  disabled="disabled"
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={(event) => this.handleOnChangInput(event, "email")}
                  value={this.state.email}
                />
              </div>
              <div className="col">
                Password
                <input
                  disabled="disabled"
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangInput(event, "password")
                  }
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                First Name
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangInput(event, "firstName")
                  }
                  value={this.state.firstName}
                />
              </div>
              <div className="col">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangInput(event, "lastName")
                  }
                  value={this.state.lastName}
                />
              </div>
            </div>
            <div className="col mt-3">
              Address
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={(event) => this.handleOnChangInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save Changes
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
