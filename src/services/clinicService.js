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

export { getSingleClinic, getAllClinic, createClinic };
