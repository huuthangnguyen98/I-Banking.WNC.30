import axios from "axios";

export default async function apiCaller(
  endpoint,
  method = "GET",
  body,
  token = ""
) {
  //let result;
  var res = await axios({
    method: method,
    url: `http://13.250.20.250:9807/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // .then((res) => {
  //   console.log(res.status);
  //   result = res;
  // })
  // .catch((err) => {
  //   console.log("error!");
  //   result = err.response;
  // });
  // return axios({
  //   method: method,
  //   url: `http://13.250.20.250:9807/${endpoint}`,
  //   data: body,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // if (res.status === 401) {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   const username = localStorage.getItem("phone");
  //   console.log("got new acess token!");
  //   let res = await axios({
  //     method: method,
  //     url: `http://13.250.20.250:9807/user/refresh-token`,
  //     data: {
  //       phone: username,
  //       refresh_token: refreshToken,
  //     },
  //     config: {
  //       timeout: 3000,
  //     },
  //   });
  //   // if (res.data.code === 0)
  //   return 0;
  // } else {
  return res;
  //}
}
