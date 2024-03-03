import axios from "../utils/axios";

export async function getOrder(id, token) {
  return await axios.get(`/order/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getOrders(status, id, token,page=1,size=10) {
  return await axios.get(`/order/user/${id}?status=${status}&page=${page}&size=${size}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function searchOrders(status = "all", code = "",token) {
  return await axios.get(`/order/search?status=${status}&code=${code}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function CreateOrderWithPaymentOnline(values, token, navigate) {
  return await axios.post(
    "/order",
    { ...values },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
