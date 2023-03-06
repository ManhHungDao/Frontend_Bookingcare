import React, { useState, useRef } from "react";
import FormData from "./Section/FormData";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useEffect } from "react";

const CodePrice = ({
  allcodeType,
  fetchAllcodeByTypeAction,
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
    fetchAllcodeByTypeAction("PRICE");
  }, []);
  useEffect(() => {
    if (allcodeType && allcodeType.length > 0) {
      setData(allcodeType);
    }
  }, [allcodeType]);
  useEffect(() => {
    if (isSuccess === true) {
      fetchAllcodeByTypeAction("PRICE");
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
            title={"Quản lý mã giá khám"}
            page={page}
            setPage={setPage}
            type="PRICE"
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
    allcodeType: state.admin.allcodeType,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeByTypeAction: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CodePrice);
