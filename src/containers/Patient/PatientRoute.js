import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../../utils";
import HomePage from "../HomePage/HomePage";
import Home from "../../routes/Home";
import DetailDoctor from "./Doctor/DetailDoctor";
import DetailSpecialty from "./Specialty/DetailSpecialty";
import DetailClinic from "./Clinic/DetailClinic";
import Doctor from "../../routes/Doctor";
import VerifyEmail from "../HomePage/VerifyEmail";
import TableSpecialtyClinic from "./Clinic/TableSpecialtyClinic";
import RenderList from "./Common/RenderList";
import DetailHandbook from "./Handbook/DetailHandbook";
import ListPostHandbook from "./Handbook/ListPostHandbook";
import ViewAllHandbook from "./Handbook/ViewAllHandbook";
import Packet from "./Packet/Packet";
import Detail_packet from "./Packet/Detail_packet";
const PatientRoute = ({ systemMenuPath }) => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={path.HOMEPAGE} element={<HomePage />} />
        {/* <Route path={"/render-list/packet"} element={Packet} />
        <Route path={"/detail-packet/:id"} element={Detail_packet} /> */}
        {/* <Route path={path.DOCTOR} element={DetailDoctor} />
        <Route path={path.SPECIALTY} element={DetailSpecialty} />
        <Route path={path.HANDBOOK} element={ViewAllHandbook} />
        <Route path={path.HANDBOOK} element={DetailHandbook} />
        <Route path={path.VERIFY_BOOKING} element={VerifyEmail} /> */}
        {/* <Route path={path.CLINIC} element={DetailClinic} /> */}
        {/* <Route
          path={path.TABLE_CLINIC_SPECIALTY}
          element={TableSpecialtyClinic}
        />
        <Route path={path.CLINIC_SPECIALTY} element={DetailClinic} />
        <Route path={path.RENDER_LIST} element={RenderList} />
        <Route path={path.LIST_POST_HANDBOOK} element={ListPostHandbook} /> */}
        <Route
          path="*"
          element={() => {
            return <Navigate to="/" />;
          }}
        />
      </Routes>
    </>
  );
};

export default PatientRoute;
