import axios from "../axios";

const upsertSchedule = (data) => {
  return axios.post(`/api/upsert-schedule`, data);
};

const updateStatus = (data) => {
  return axios.put(`/api/update-status-schedule`, data);
};

const sentMailPatient = (data) => {
  return axios.post(`/api/sent-mail-patient`, data);
};

const getSingleSchedule = (id, date) => {
  return axios.get(`/api/get-schedule?id=${id}&date=${date}`);
};

const getScheduleUserByDate = (data) => {
  return axios.get(
    `/api/get-user-schedule?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}&date=${data.date}`
  );
};

const deleteSchedule = (id, date) => {
  return axios.delete(`/api/delete-schedule?id=${id}&date=${date}`);
};

export { upsertSchedule, getSingleSchedule, deleteSchedule, sentMailPatient ,getScheduleUserByDate,updateStatus};
