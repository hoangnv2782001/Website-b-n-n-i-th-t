import axios from "../utils/axios";

export async function uploadImage(img,token) {
  const form = new FormData();

  form.append("file", img);

  return axios.post("/files", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}
