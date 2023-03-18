import axios from "../axios";

const upsertSchedule = (data) => {
  return axios.post(`/api/upsert-schedule`, data);
};

const getSingleSchedule = (id, date) => {
  return axios.get(`/api/get-schedule?id=${id}&date=${date}`);
};
const deleteSchedule = (id, date) => {
  return axios.delete(`/api/delete-schedule?id=${id}&date=${date}`);
};

export { upsertSchedule, getSingleSchedule, deleteSchedule };
