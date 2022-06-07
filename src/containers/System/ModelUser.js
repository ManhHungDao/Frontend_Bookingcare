import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModelUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    return (
      <Modal
        size="lg"
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"abcclassname"}
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create A New User
        </ModalHeader>
        <ModalBody>
          <form>
            <div class="row">
              <div class="col">
                <lable>Email</lable>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col">
                <lable>Password</lable>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <lable>First Name</lable>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col">
                <lable>Last Name</lable>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div class="col mt-3">
              <lable>Address</lable>
              <input type="text" class="form-control" placeholder="Last name" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.toggle()}>
            Do Something
          </Button>
          <Button color="secondary" onClick={() => this.toggle()}>
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
