import axios from "axios";

export default function apiCaller(endpoint, method = "GET", body, token = "") {
    //console.log(localStorage.getItem("token"));
    return axios({
        method: method,
        url: `http://54.169.97.16:8000/${endpoint}`,
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
