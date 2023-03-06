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
  const [keyMap, setKeyMap] = useState("");
  const key = useRef();
  useEffect(() => {
    fetchAllcodeByTypeAction("PRICE");
  }, []);
  useEffect(() => {
    const dataInput = [...allcodeType].sort((a, b) =>
      a.keyMap.localeCompare(b.keyMap)
    );
    setData(dataInput);
    const lastElement = dataInput.slice(-1)[0];
    if (lastElement && lastElement.keyMap) {
      const number = parseInt(lastElement.keyMap.match(/\d+/)[0], 10);
      let keyMap = `${"PRI" + (parseInt(number) + 1)}`;
      key.current = keyMap;
      setKeyMap(keyMap);
    }
  }, [allcodeType]);
  useEffect(() => {
    if (isSuccess === true) {
      fetchAllcodeByTypeAction("PRICE");
      clearStatus();
      setOpenConfirmModal(false);
      setValueVI("");
      setValueEN("");
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
            keyMap={keyMap}
            setKeyMap={setKeyMap}
            keyMapConstant={key.current}
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
