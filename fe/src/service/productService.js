import axios from "../utils/axios";

export async function getProduct(id) {
  return axios.get(`/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}


export async function searchProduct(param="",sort="",page =1,size=10) {

  
  return axios.get(`/products/search?keyword=${param}&sort=${sort}&page=${page}&size=${size}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
 
export async function getProductsByCategory(id,sort="",page=1 ,size=12) {
  console.log("sort 1234567",sort)
  return await axios.get(`/products/category/${id}?sort=${sort}&page=${page}&size=${size}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}



export async function getProducts(param) {
  return axios.get(`/products/?param=${param}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}