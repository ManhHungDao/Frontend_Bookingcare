import axios from "../axios";

const createSpecialty = (data) => {
  return axios.post(`/api/create-specialty`, data);
};

const getSingleSpecialty = (id) => {
  return axios.get(`/api/get-specialty?id=${id}`);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

const deleteSpecialty = (id) => {
  return axios.delete(`/api/delete-specialty?id=${id}`);
};

export { getSingleSpecialty, getAllSpecialty, createSpecialty,deleteSpecialty };
