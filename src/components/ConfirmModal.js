import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentDidUpdate() {}

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.openModal}
          toggle={() => {
            this.props.closeModal();
          }}
          className={this.props.className}
          centered
        >
          <ModalHeader
            toggle={() => {
              this.props.closeModal();
            }}
          >
            <FormattedMessage id="modal.title" />
          </ModalHeader>
          <ModalBody>{this.props.content ? this.props.content : ""}</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                this.props.handleConfirm();
              }}
            >
              <FormattedMessage id="manage-user.delete" />
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              <FormattedMessage id="manage-user.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ConfirmModal;
