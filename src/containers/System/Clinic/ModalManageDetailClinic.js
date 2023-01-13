import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDetailClinic.scss";
import { FormattedMessage } from "react-intl";
import "react-image-lightbox/style.css";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalManageDetailClinic = ({ openModal, closeModal, id, name }) => {
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  // useEffect(() => {
  //   setIsOpen(openModal);
  // }, [openModal]);
  return (
    <>
      <Modal
        isOpen={openModal}
        toggle={() => closeModal()}
        centered
        size={"lg"}
        className="custom-modal-style"
      >
        <ModalHeader toggle={() => closeModal()}>
          <FormattedMessage id="admin.manage-detail-clinic.title" /> - {name}
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12 form-group">
                <FormattedMessage id="admin.manage-doctor.note" />
                <CKEditorFieldBasic
                  value={content}
                  // onChange={handleChangeNoteContent}
                />
              </div>
              <div className="col-12 form-group mt-3">
                <FormattedMessage id="admin.manage-doctor.detail" />
                <CKEditorFieldBasic
                  value={content}
                  // onChange={handleChangeContent}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            // onClick={() => handleSave()}
          >
            <FormattedMessage id="admin.manage-clinic.save" />
            {/*   {isAddNewUser ? (
              <FormattedMessage id="admin.manage-clinic.add" />
            ) : (
              <FormattedMessage id="admin.manage-clinic.save" />
            )} */}
          </Button>
          <Button color="secondary" onClick={() => closeModal()}>
            <FormattedMessage id="patient.booking-modal.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDetailClinic: (data) => dispatch(actions.createDetailClinic(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalManageDetailClinic);
