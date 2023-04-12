import axios from "../axios";

const registerAccount = (data) => {
  return axios.post("/api/register", data);
};

const sentMailConfirm = (data) => {
  return axios.post("/api/sent-mail-confirm-register", data);
};

const patientLogin = (email, password) => {
  return axios.post("/api/patient-login", { email, password });
};

export { registerAccount, sentMailConfirm, patientLogin };
