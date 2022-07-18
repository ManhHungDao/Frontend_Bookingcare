import axios from "../axios";

const handleLoginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsersService = (inputId) => {
console.log("🚀 ~ file: userService.js ~ line 8 ~ getAllUsersService ~ inputId", inputId)
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
const postSubDetailDocTorService = (data) => {
  return axios.post(`/api/save-sub-info-doctor`, data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleService = (doctorId, date) => {
  /*   return axios.get(`/api/get-schedule`, {
    data: {
      doctorId,
      date,
    },
  }); */
  return axios.get(`/api/get-schedule?doctorId=${doctorId}&date=${date}`);
};
const getExtraInfoDoctorService = (id) => {
  return axios.get(`/api/get-extra-info-doctor?id=${id}`);
};

const postBookAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBooingService = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const postASpecialty = (data) => {
  return axios.post(`/api/create-specialty`, data);
};

const getSpecialties = () => {
  return axios.get(`/api/get-specialty`);
};

const getListSpecialty = () => {
  return axios.get(`/api/get-list-specialty`);
};
const getDetailSpecialty = (specialtyId) => {
  return axios.get(`/api/get-detail-specialty?specialtyId=${specialtyId}`);
};
const getListDoctorSpecialty = (data) => {
  return axios.get(
    `/api/get-doctor-specialty?specialtyId=${data.specialtyId}&provinceId=${data.provinceId}`
  );
};

const createANewClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};

const getListClinic = () => {
  return axios.get(`/api/get-list-clinic`);
};
const getListClinicHome = () => {
  return axios.get(`/api/get-list-home-clinic`);
};
const getDetailClinic = (id) => {
  return axios.get(`/api/get-detail-clinic?id=${id}`);
};
const getListDoctorClinic = (data) => {
  return axios.get(
    `/api/get-list-doctor-clinic?provinceId=${data.provinceId}&clinicId=${data.clinicId}`
  );
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSemery = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const updateClinic = (data) => {
  return axios.put(`/api/update-detail-clinic`, data);
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
  saveBulkScheduleDoctor,
  getScheduleService,
  postSubDetailDocTorService,
  getExtraInfoDoctorService,
  postBookAppointmentService,
  postVerifyBooingService,
  postASpecialty,
  getSpecialties,
  getListSpecialty,
  getDetailSpecialty,
  getListDoctorSpecialty,
  createANewClinic,
  getListClinic,
  getListClinicHome,
  getDetailClinic,
  getListDoctorClinic,
  getAllPatientForDoctor,
  postSemery,
  updateClinic,
};
