import axios from "axios";

export default function apiCaller(endpoint, method = "GET", body, token = "") {
  return axios({
    method: method,
    url: `http://13.228.78.89:8000/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
