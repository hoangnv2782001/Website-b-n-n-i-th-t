import axios from "../utils/axios";

export async function getCategory(id, token) {
  return axios.get(`/categorys/${id}`, {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  });
}

export async function searchCategory(param = "", token) {
  return axios.get(`/categorys/search?param=${param}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
