import React, { useState } from "react";
import FormData from "./Section/FormData";
import Header from "../../../components/Header";
import { Box } from "@mui/material";
const ManageAllcode = ({ data }) => {
  return (
    <>
      <Box m="20px">
        <Header title="Quản lý các vụ" subtitle="Quản lý thành viên" />
        <FormData title={"Quản lý tên chuyên khoa"} />
        <FormData title={"Quản lý tên chuyên khoa"} />
      </Box>
    </>
  );
};

export default ManageAllcode;
