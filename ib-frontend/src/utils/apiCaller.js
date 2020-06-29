import axios from "axios";

export default function apiCaller(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `http://localhost:3001/api/${endpoint}`,
        data: body,
    });
}
