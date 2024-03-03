import axios from "../utils/axios";

export async function payment(values,token) {
  return axios.post(
    `/payment`,
    { ...values },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
