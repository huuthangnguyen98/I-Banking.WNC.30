import axios from "axios";
//import { hide_spinner } from "../actions/index";
export default async function apiCaller(
  endpoint,
  method = "GET",
  body,
  token = ""
) {
  return await axios({
    method: method,
    url: `http://13.250.20.250:9807/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(async (err) => {
    console.log("err");

    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("phone");
    console.log("got new acess token!");
    return await axios({
      method: "POST",
      url: `http://13.250.20.250:9807/user/refresh-token`,
      data: {
        phone: username,
        refresh_token: refreshToken,
      },
    }).then(async (res) => {
      const token = res.data.data.access_token;
      localStorage.setItem("token", token);

      return await axios({
        method: method,
        url: `http://13.250.20.250:9807/${endpoint}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  });
}
