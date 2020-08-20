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
  // Unlock it if you want call to refresh token and send request again after get 401 Unauth error.
  /*
  .catch((err) => {
    console.log("error");

    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("phone");
    console.log("got new acess token!");
    return axios({
      method: "POST",
      url: `http://13.250.20.250:9807/user/refresh-token`,
      data: {
        phone: username,
        refresh_token: refreshToken,
      },
    }).then((res) => {
      const token = res.data.data.access_token;
      localStorage.setItem("token", token);

      return axios({
        method: method,
        url: `http://13.250.20.250:9807/${endpoint}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  }); 
  */
}

//end here