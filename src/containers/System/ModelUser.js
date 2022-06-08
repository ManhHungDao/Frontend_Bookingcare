import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModelUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: " ",
        password: " ",
        firstName: " ",
        lastName: " ",
        address: " ",
      });
    });
  }

  componentDidMount() {}

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
    // let arrInput = ["email", "password", "firstName", "lastName", "address"];
    const arrInput = Object.keys(this.state);
    for (let i = 0; i < arrInput.length; i++)
      if (!this.state[arrInput[i]]) {
        alert(`Missing parameters ${arrInput[i]}`);
        return false;
      }
    return true;
  };
  handleAddNewUser = () => {
    const isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.props.isOpen}>
        <ModalHeader toggle={() => this.toggle()}>
          Create A New User
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="row">
              <div className="col">
                Email
                <input
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
            onClick={() => this.handleAddNewUser()}
          >
            Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
