import axios from "../axios";

const createHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};

const getAllHandbook = (data) => {
  return axios.get(
    `/api/get-all-handbook?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}`
  );
};

const deleteHandbook = (id) => {
  return axios.delete(`/api/delete-handbook?id=${id}`);
};
const updateHandbook = (id, data) => {
  return axios.put(`/api/update-handbook?id=${id}`, data);
};

export { createHandbook, getAllHandbook, deleteHandbook, updateHandbook };
