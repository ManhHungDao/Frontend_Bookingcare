import axios from "../axios";

const createClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};

const getSingleClinic = (id) => {
  return axios.get(`/api/get-clinic?id=${id}`);
};

const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

const getAllClinicHomePatient = () => {
  return axios.get(`/api/get-all-clinic-home`);
};

export { getSingleClinic, getAllClinic, createClinic ,getAllClinicHomePatient};
