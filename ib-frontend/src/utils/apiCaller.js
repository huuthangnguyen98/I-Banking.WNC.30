import axios from "axios";

export default function apiCaller(endpoint, method = "GET", body, token = "") {
  return axios({
    method: method,
    url: `https://internet-banking-30.herokuapp.com/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
