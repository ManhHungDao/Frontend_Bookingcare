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

const getAllCodeService = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/top-all-doctor`);
};

const postDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};


export {
  handleLoginApiService,
  getAllUsersService,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  postDetailDoctorService,
  getDetailInfoDoctor,
};
