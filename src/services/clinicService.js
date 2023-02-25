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

const pageViewCount = (id) => {
  return axios.post(`/api/increment-view-count?id=${id}`);
};
export {
  getSingleClinic,
  getAllClinic,
  createClinic,
  getAllClinicHomePatient,
  pageViewCount,
};
