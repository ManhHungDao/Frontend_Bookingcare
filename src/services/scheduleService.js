import axios from "../axios";

const upsertSchedule = (data) => {
  return axios.post(`/api/upsert-schedule`, data);
};

const updateStatus = (data) => {
  return axios.put(`/api/update-status-schedule`, data);
};

const sentMailPatient = (data) => {
  return axios.post(`/api/sent-mail-patient`, data);
};

const getSingleUserSchedule = (id, date) => {
  return axios.get(`/api/get-single-user-schedule?id=${id}&date=${date}`);
};

const getSinglePacketSchedule = (id, date) => {
  return axios.get(`/api/get-single-packet-schedule?id=${id}&date=${date}`);
};

const getScheduleUserByDate = (data) => {
  return axios.get(
    `/api/get-user-schedule?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}&date=${data.date}`
  );
};

const getSchedulePacketByDate = (data) => {
  return axios.get(
    `/api/get-packet-schedule?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}&date=${data.date}`
  );
};

const deleteSchedule = (id, date) => {
  return axios.delete(`/api/delete-schedule?id=${id}&date=${date}`);
};

const createUserBookingSchedule = (data) => {
  return axios.put(`/api/create-user-booking-schedule`, data);
};

const patientConfirmBooking = (data) => {
  return axios.put(`/api/patient-confirm-booking`, data);
};

export {
  upsertSchedule,
  getSingleUserSchedule,
  deleteSchedule,
  sentMailPatient,
  getScheduleUserByDate,
  updateStatus,
  getSchedulePacketByDate,
  getSinglePacketSchedule,
  createUserBookingSchedule,
  patientConfirmBooking,
};
