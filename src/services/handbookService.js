import axios from "../axios";

const createHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};

export { createHandbook };
