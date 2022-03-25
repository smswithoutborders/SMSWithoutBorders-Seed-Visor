import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function getSeeders() {
  const { data } = await axios.get("/seeds");
  return data;
}
