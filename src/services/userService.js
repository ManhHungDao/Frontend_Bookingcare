import axios from "../axios";

const loginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUserService = () => {
  return axios.get("/api/get-all-user");
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
  updateUserService,
  getSingleUserService,
  loginApiService,
  getAllUserService,
  createNewUserService,
  deleteUserService,
};
