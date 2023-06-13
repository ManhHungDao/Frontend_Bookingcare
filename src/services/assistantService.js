import axios from "../axios";

const createNewAssistant = (data) => {
  return axios.post("/api/create-new-assistant", data);
};

export { createNewAssistant };
