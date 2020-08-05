import axios from "axios";

export default function apiCaller(endpoint, method = "GET", body, token = "") {
  return axios({
    method: method,
    url: `http://13.250.20.250:9807/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
