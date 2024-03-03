import axios from "../utils/axios";

export async function changePassword(password, token) {
  return await axios.put(
    `/users/password`,
    { password },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getAllUsers( token) {
  return await axios.get(
    `/users/role/user`,
  
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
