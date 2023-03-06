import React from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import CodePayment from "./CodePayment";
import CodePrice from "./CodePrice";

const CodeBusiness = () => {
  return (
    <>
      <Box m="20px">
        <Header title="Quản lý tác vụ" />
        <CodePrice />
        <CodePayment />
      </Box>
    </>
  );
};

export default CodeBusiness;
