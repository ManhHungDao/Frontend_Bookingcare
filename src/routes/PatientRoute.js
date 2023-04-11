import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../utils";


const PatientRoute = () => {
  return (
    <>
      <Routes>
      

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default PatientRoute;
