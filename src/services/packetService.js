import axios from "../axios";

const createPacketService = (data) => {
  return axios.post(`/api/create-packet`, data);
};

const deletePacket = (id) => {
  return axios.delete(`/api/delete-packet?id=${id}`);
};

export { createPacketService, deletePacket };
