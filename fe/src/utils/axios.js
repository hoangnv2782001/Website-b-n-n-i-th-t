import axios from "axios";

import { BASE_URL } from "../config";

// init instance to call api with base url
const axiosInstance = axios.create({ baseURL: BASE_URL });

// handle response
axiosInstance.interceptors.response.use(
  (response) => response,
  //   when occur errr , return promise reject data if resonse !=null or "eSomething wnt wrong"
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
