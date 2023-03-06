import React, { useState } from "react";
import FormData from "./Section/FormData";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useEffect, useRef } from "react";

const CodePayment = ({
  allcodes,
  fetchAllcodeAction,
  isSuccess,
  clearStatus,
}) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [valueVI, setValueVI] = useState("");
  const [valueEN, setValueEN] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAllcodeAction();
  }, []);
  useEffect(() => {
    if (allcodes && allcodes.length > 0) {
      let dataInput = allcodes.filter((e) => e.type === "PAYMENT");
      setData(dataInput);
    }
  }, [allcodes]);
  useEffect(() => {
    if (isSuccess === true) {
      fetchAllcodeAction();
      clearStatus();
      setOpenConfirmModal(false);
      setValueVI("");
      setValueEN("");
      setIsEdit(false);
    }
  }, [isSuccess]);

  return (
    <>
      {data && (
        <>
          <FormData
            title={"Quản lý phương thức thanh toán"}
            page={page}
            setPage={setPage}
            type="PAYMENT"
            data={data}
            openConfirmModal={openConfirmModal}
            setOpenConfirmModal={setOpenConfirmModal}
            valueVI={valueVI}
            setValueVI={setValueVI}
            valueEN={valueEN}
            setValueEN={setValueEN}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allcodes: state.admin.allcodes,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeAction: () => dispatch(actions.fetchAllcodeAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CodePayment);
