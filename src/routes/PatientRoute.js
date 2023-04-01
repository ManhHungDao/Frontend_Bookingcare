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
import DetailPacket from "../containers/Patient/Packet/DetailPacket";
import PatientConfirmBooking from "../containers/Patient/Schedule/Booking/PatientConfirmBooking";
import HomeHandbook from "../containers/Patient/Handbook/HomeHandbook";

const PatientRoute = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={path.HOMEPAGE} element={<HomePage />} />
        <Route path={path.SPECIALTY} element={<DetailSpecialty />} />
        <Route path={path.CLINIC} element={<DetailClinic />} />
        <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
        <Route path={path.HANDBOOK} element={<HomeHandbook />} />
        <Route path={path.DETAIL_HANDBOOK} element={<DetailHandbook />} />
        <Route
          path={path.VIEWMORE_SPECIALTY}
          element={<DataSectionViewMore />}
        />
        <Route path={path.VIEWMORE_CLINIC} element={<DataSectionViewMore />} />
        <Route path={path.VIEWMORE_DOCTOR} element={<DoctorViewMore />} />
        <Route path={path.PACKET} element={<HomePacket />} />
        <Route path={path.DETAIL_PACKET} element={<DetailPacket />} />
        <Route
          path={path.CONFIRM_BOOKING}
          element={<PatientConfirmBooking />}
        />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default PatientRoute;
