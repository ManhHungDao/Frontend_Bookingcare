import axios from "../axios";

const registerAccount = (data) => {
  return axios.post("/api/register", data);
};

const sentMail = (data) => {
  return axios.post("/api/sent-mail-confirm-register", data);
};

const patientLogin = (email, password) => {
  return axios.post("/api/patient-login", { email, password });
};

const patientResetPassword = (email, password) => {
  return axios.patch("/api/patient-reset-password", {
    email,
    password,
  });
};

const patientChangePassword = (email, oldPassword, newPassword) => {
  return axios.patch("/api/patient-change-password", {
    email,
    oldPassword,
    newPassword,
  });
};

const getInforAccount = (id) => {
  return axios.get(`/api/get-infor-account?id=${id}`);
};

const updateInforAccount = (id, data) => {
  return axios.put(`/api/update-infor-account?id=${id}`, data);
};

const getAllBookingByEmail = (data) => {
  return axios.get(
    `/api/get-schedule-by-email?email=${data.email}&date=${data.date}`
  );
};
const getAllAccountPatient = (data) => {
  return axios.get(
    `/api/get-all-account-patient?page=${data.page}&size=${data.size}&filter=${data.filter}`
  );
};

const deleteAccountPatient = (id) => {
  return axios.delete(`/api/delete-account-patient?id=${id}`);
};

export {
  registerAccount,
  sentMail,
  patientLogin,
  patientChangePassword,
  patientResetPassword,
  getInforAccount,
  updateInforAccount,
  getAllBookingByEmail,
  getAllAccountPatient,
  deleteAccountPatient,
};
