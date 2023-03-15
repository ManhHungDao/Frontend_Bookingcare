import axios from "../axios";

const createHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};

const getAllHandbook = (data) => {
  return axios.get(
    `/api/get-all-handbook?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}`
  );
};

export { createHandbook, getAllHandbook };
