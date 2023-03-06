import axios from "../axios";

const getAllcode = () => {
  return axios.get(`/api/get-all-allcode`);
};

const getAllcodeByType = (type) => {
  return axios.get(`/api/get-allcode-type?type=${type}`);
};

const createAllcode = (data) => {
  return axios.post(`/api/create-allcode`, data);
};
const updateAllcode = (id, data) => {
  return axios.put(`/api/update-allcode?id=${id}`, data);
};
const deleteAllcode = (id) => {
  return axios.delete(`/api/delete-allcode?id=${id}`);
};

export {
  getAllcode,
  createAllcode,
  updateAllcode,
  deleteAllcode,
  getAllcodeByType,
};
