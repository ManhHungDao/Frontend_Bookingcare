import React, { useState } from "react";
import FormData from "./Section/FormData";
import Header from "../../../components/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";

const CodeSpecialty = ({
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
    fetchAllcodeByTypeAction("SPECIALTY");
  }, []);
  useEffect(() => {
    if (allcodeType && allcodeType.length > 0) {
      setData(allcodeType);
    }
  }, [allcodeType]);
  useEffect(() => {
    if (isSuccess === true) {
      fetchAllcodeByTypeAction("SPECIALTY");
      clearStatus();
      setOpenConfirmModal(false);
      setValueVI("");
      setValueEN("");
      setIsEdit(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Box m="20px">
        <Header title="Quản lý tác vụ" subtitle="Quản lý thành viên" />
        {data && (
          <>
            <FormData
              title={"Quản lý tên chuyên khoa"}
              page={page}
              setPage={setPage}
              type="SPECIALTY"
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
export default connect(mapStateToProps, mapDispatchToProps)(CodeSpecialty);
