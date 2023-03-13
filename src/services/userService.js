import axios from "../axios";

const loginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const changePasswordApiService = (data) => {
  return axios.patch("/api/change-password", data);
};

const resetPasswordApiService = (email) => {
  return axios.patch("/api/reset-password", email);
};

const getAllUserService = (data) => {
  return axios.get(
    `/api/get-all-user?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}`
  );
};

const getSingleUserService = (id) => {
  return axios.get(`/api/get-user?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-user`, data);
};

const updateUserService = (id, data) => {
  return axios.put(`/api/update-user?id=${id}`, data);
};

const deleteUserService = (id) => {
  return axios.delete(`/api/delete-user?id=${id}`);
};

export {
  changePasswordApiService,
  updateUserService,
  getSingleUserService,
  loginApiService,
  getAllUserService,
  createNewUserService,
  deleteUserService,
  resetPasswordApiService,
};
