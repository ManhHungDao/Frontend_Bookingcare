import axios from "../axios";

const handleLoginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsersService = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`);
  // return axios.get(`/api/get-all-user`, {
  //   data: {
  //     id: inputId,
  //   },
  // });
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

const editUserService = (user) => {
  return axios.put(`/api/edit-user`, user);
};

export {
  handleLoginApiService,
  getAllUsersService,
  createNewUserService,
  deleteUserService,
  editUserService,
};
