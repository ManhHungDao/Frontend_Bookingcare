import React, { useState, useEffect, useRef } from "react";
import FormData from "./Section/FormData";
import Header from "../../../components/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";

const CodeProvince = ({
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
    fetchAllcodeByTypeAction("PROVINCE");
  }, []);
  useEffect(() => {
    const dataInput = [...allcodeType].sort((a, b) =>
      a.keyMap.localeCompare(b.keyMap)
    );
    setData(dataInput);
    const lastElement = dataInput.slice(-1)[0];
    if (lastElement && lastElement.keyMap) {
      const number = parseInt(lastElement.keyMap.match(/\d+/)[0], 10);
      const keyMap = `${"PRO" + (parseInt(number) + 1)}`;
      key.current = keyMap;
      setKeyMap(keyMap);
    }
  }, [allcodeType]);
  useEffect(() => {
    if (isSuccess === true) {
      fetchAllcodeByTypeAction("PROVINCE");
      clearStatus();
      setOpenConfirmModal(false);
      setValueVI("");
      setValueEN("");
    }
  }, [isSuccess]);

  return (
    <>
      <Box m="20px">
        <Header title="Quản lý tác vụ" subtitle="Quản lý thành viên" />
        {data && (
          <FormData
            title={"Quản lý mã thành phố"}
            page={page}
            setPage={setPage}
            type="PROVINCE"
            data={data}
            openConfirmModal={openConfirmModal}
            setOpenConfirmModal={setOpenConfirmModal}
            valueVI={valueVI}
            setValueVI={setValueVI}
            valueEN={valueEN}
            setValueEN={setValueEN}
            keyMap={keyMap}
            keyMapConstant={key.current}
            setKeyMap={setKeyMap}
          />
        )}
      </Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(CodeProvince);
