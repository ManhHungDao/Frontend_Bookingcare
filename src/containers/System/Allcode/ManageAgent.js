import React, { useState } from "react";
import FormData from "./Section/FormData";
import Header from "../../../components/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import { useEffect } from "react";

const CodePrice = ({ allcodes, fetchAllcodeAction }) => {
  const [pageSpeciaty, setPageSpeciaty] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchAllcodeAction();
  }, []);
  useEffect(() => {
    setData(allcodes);
  }, [allcodes]);
  return (
    <>
      <Box m="20px">
        <Header title="Quản lý các vụ" subtitle="Quản lý thành viên" />
        {data && (
          <>
            <FormData
              title={"Quản lý tên chuyên khoa"}
              page={pageSpeciaty}
              setPage={setPageSpeciaty}
              type="SPECIALTY"
              data={data.filter((e) => e.type === "PRICE")}
            />
          </>
        )}
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeAction: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CodePrice);
