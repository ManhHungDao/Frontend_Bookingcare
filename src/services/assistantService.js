import axios from "../axios";

const createNewAssistant = (data) => {
  return axios.post("/api/create-new-assistant", data);
};
const getAllAssistant = (data) => {
  return axios.get(
    `/api/get-all-assistant?page=${data.page}&filter=${data.filter}&size=${data.size}`
  );
};

const deleteAssistant = (id) => {
  return axios.delete(`/api/remove-assistant?id=${id}`);
};

const getSingleAssistant = (id) => {
  return axios.get(`/api/get-single-assistant?id=${id}`);
};

export {
  createNewAssistant,
  getAllAssistant,
  deleteAssistant,
  getSingleAssistant,
};
