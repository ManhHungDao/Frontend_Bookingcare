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

const editUserService = (user) => {
  return axios.put(`/api/edit-user`, user);
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

const postBookAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBooingService = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const getSpecialties = () => {
  return axios.get(`/api/get-specialty`);
};

const getListSpecialty = () => {
  return axios.get(`/api/get-list-specialty`);
};
const getSpecialty = (specialtyId) => {
  return axios.get(`/api/get-detail-specialty?specialtyId=${specialtyId}`);
};
const getListDoctorSpecialty = (data) => {
  return axios.get(
    `/api/get-doctor-specialty?specialtyId=${data.specialtyId}&provinceId=${data.provinceId}`
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

const deleteClinicService = (id) => {
  return axios.delete(`/api/delete-clinic?id=${id}`);
};

const getListSpecialtyByClinicIdService = (id) => {
  return axios.get(`/api/get-list-specialty-by-clinicId?id=${id}`);
};

const deleteSpecialtyService = (id) => {
  return axios.delete(`/api/delete-specialty?id=${id}`);
};

const updateSpecialtyService = (data) => {
  return axios.put(`/api/update-specialty`, data);
};

const getDetailClinicService = (id) => {
  return axios.get(`/api/get-detail-clinic?id=${id}`);
};

const createDetailSpecialty = (data) => {
  return axios.post(`/api/create-detail-specialty`, data);
};

const getDetailSpecialty = (id) => {
  return axios.get(`/api/get-detailSpecialty?specialtyId=${id}`);
};

const createAHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};
const getAHandbook = (id) => {
  return axios.get(`/api/get-handbook?id=${id}`);
};
const getListHandbook = () => {
  return axios.get(`/api/get-list-handbook`);
};
const editHandbook = (data) => {
  return axios.put(`/api/update-handbook`, data);
};

const deleteHandbook = (id) => {
  return axios.delete(`/api/delete-handbook?id=${id}`);
};

const createDetailHandbook = (data) => {
  return axios.post(`/api/create-detail-handbook`, data);
};

const getDetailHandbook = (id) => {
  return axios.get(`/api/get-detail-handbook?id=${id}`);
};
const getListDetailHandbookService = (id) => {
  return axios.get(`/api/get-list-detail-handbook?id=${id}`);
};
const updateDetailHandbook = (data) => {
  return axios.put(`/api/update-detail-handbook`, data);
};
const deleteDetailHandbook = (id) => {
  return axios.delete(`/api/delete-detail-handbook?id=${id}`);
};
const getHandBookHome = (limit, offset) => {
  return axios.get(`/api/get-handbook-home?limit=${limit}&offset=${offset}`);
};
const getRelatedHandbook = (id) => {
  return axios.get(`/api/get-related-handbook?id=${id}`);
};

const handleemailForgetPass = (email, otp) => {
  return axios.post("/api/forgetpass", { email, otp });
};
const updatePass = (email, password) => {
  return axios.post("/api/updatePass", { email, password });
};

const createPacketService = (data) => {
  return axios.post("/api/createPacket", data);
};

const deletePacketService = (id) => {
  return axios.delete(`/api/delete-packet?id=${id}`);
};
// updatePacketService
const updatePacketService = (data) => {
  return axios.post(`/api/update-packet`, data);
};
const getAllPacketService = () => {
  return axios.get("/api/getAllPacket");
};
const getDetailPacketByID = (id) => {
  return axios.get(`/api/getDetailPacket/${id}`);
};

const getPacketByDanhMucService = (id) => {
  return axios.get(`/api/getPacketByDanhMuc?typepacket=${id}`);
};

export {
  updateUserService,
  getSingleUserService,
  loginApiService,
  getAllUserService,
  getPacketByDanhMucService,
  getDetailPacketByID,
  getAllPacketService,
  updatePacketService,
  deletePacketService,
  updatePass,
  handleemailForgetPass,
  getRelatedHandbook,
  getHandBookHome,
  getListDetailHandbookService,
  deleteDetailHandbook,
  updateDetailHandbook,
  getDetailHandbook,
  createDetailHandbook,
  deleteHandbook,
  editHandbook,
  getAHandbook,
  getListHandbook,
  createAHandbook,
  getDetailSpecialty,
  createDetailSpecialty,
  deleteSpecialtyService,
  getDetailClinicService,
  updateSpecialtyService,
  createNewUserService,
  getListSpecialtyByClinicIdService,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorService,
  postDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleService,
  postSubDetailDocTorService,
  postBookAppointmentService,
  postVerifyBooingService,
  getSpecialties,
  getListSpecialty,
  getSpecialty,
  getListDoctorSpecialty,
  getAllPatientForDoctor,
  postSemery,
  deleteClinicService,
  createPacketService,
};
