import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../utils";
import HomePage from "../containers/HomePage/HomePage";
import DetailDoctor from "../containers/Patient/Doctor/DetailDoctor";
import DetailSpecialty from "../containers/Patient/Specialty/DetailSpecialty";
import DetailClinic from "../containers/Patient/Clinic/DetailClinic";
import DetailHandbook from "../containers/Patient/Handbook/DetailHandbook";
import DataSectionViewMore from "../containers/HomePage/Section/ViewMore/DataSectionViewMore";
import DoctorViewMore from "../containers/HomePage/Section/ViewMore/DoctorViewMore";
import HomePacket from "../containers/Patient/Packet/HomePacket";

const PatientRoute = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={path.HOMEPAGE} element={<HomePage />} />
        {/* <Route path={"/render-list/packet"} element={Packet} />
        <Route path={"/detail-packet/:id"} element={Detail_packet} /> */}
        {/* <Route path={path.DOCTOR} element={DetailDoctor} />
        <Route path={path.HANDBOOK} element={ViewAllHandbook} />
        <Route path={path.HANDBOOK} element={DetailHandbook} />
      <Route path={path.VERIFY_BOOKING} element={VerifyEmail} /> */}
        <Route path={path.SPECIALTY} element={<DetailSpecialty />} />
        <Route path={path.CLINIC} element={<DetailClinic />} />
        <Route path={path.DETAILDOCTOR} element={<DetailDoctor />} />
        <Route path={path.HANDBOOK} element={<DetailHandbook />} />
        <Route path={path.VIEWMORE_SPECIALTY} element={<DataSectionViewMore />} />
        <Route path={path.VIEWMORE_CLINIC} element={<DataSectionViewMore />} />
        <Route path={path.VIEWMORE_DOCTOR} element={<DoctorViewMore />} />
        <Route path={path.PACKET} element={<HomePacket />} />

        
        {/* <Route
          path={path.TABLE_CLINIC_SPECIALTY}
          element={TableSpecialtyClinic}
        />
        <Route path={path.CLINIC_SPECIALTY} element={DetailClinic} />
        <Route path={path.RENDER_LIST} element={RenderList} />
        <Route path={path.LIST_POST_HANDBOOK} element={ListPostHandbook} /> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default PatientRoute;
