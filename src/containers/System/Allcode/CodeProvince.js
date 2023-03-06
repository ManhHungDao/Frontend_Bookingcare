import React, { useState } from "react";
import FormData from "./Section/FormData";
import Header from "../../../components/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import { useEffect } from "react";

const CodeProvince = ({ allcodeType, fetchAllcodeByTypeAction }) => {
  const [pageSpeciaty, setPageSpeciaty] = useState(0);
  const [data, setData] = useState([]);
  const [lastNum, setLastNum] = useState("");
  useEffect(() => {
    fetchAllcodeByTypeAction("PROVINCE");
  }, []);
  useEffect(() => {
    const dataInput = [...allcodeType].sort((a, b) =>
      a.keyMap.localeCompare(b.keyMap)
    );
    setData(dataInput);
  }, [allcodeType]);

  useEffect(() => {
    if (data && data.length > 0) {
      const lastElement = data.slice(-1)[0];
      const number = parseInt(lastElement.keyMap.match(/\d+/)[0], 10);
      setLastNum(parseInt(number) + 1);
    }
  }, [data]);
  return (
    <>
      <Box m="20px">
        <Header title="Quản lý tác vụ" subtitle="Quản lý thành viên" />
        {data && (
          <FormData
            title={"Quản lý mã thành phố"}
            page={pageSpeciaty}
            setPage={setPageSpeciaty}
            type="PROVINCE"
            data={data}
            lastNum={lastNum.toString()}
            keyMapConstant="PRO"
          />
        )}
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allcodeType: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeByTypeAction: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CodeProvince);
