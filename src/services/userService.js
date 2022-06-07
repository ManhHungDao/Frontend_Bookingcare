import axios from "../axios";

const handleLoginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsersService = (inputId) => {
  return axios.get(`api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

export { handleLoginApiService, getAllUsersService, createNewUserService };
