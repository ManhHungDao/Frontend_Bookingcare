import axios from "../axios";

const getListALlcodes = () => {
  return axios.get(`/api/get-all-allcode`);
};

export { getListALlcodes };
