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

export {
  registerAccount,
  sentMail,
  patientLogin,
  patientChangePassword,
  patientResetPassword,
};
