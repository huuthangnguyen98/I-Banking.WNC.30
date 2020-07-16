import axios from "axios";

export default function apiCaller(endpoint, method = "GET", body, token = "") {
  return axios({
    method: method,
    url: `http://54.179.129.7:8000/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
