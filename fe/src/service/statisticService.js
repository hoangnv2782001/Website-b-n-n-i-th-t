import axios from "../utils/axios";

export async function getStatistic(token) {
  return await axios.get(`/statistics`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getNewOrders(token) {
  return await axios.get(`/statistics/orders`, {
    headers: {
      "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
    },
  });
}

export async function getStatisticRevenue(token) {
  return await axios.get(`/statistics/revenue`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
