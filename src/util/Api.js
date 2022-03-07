import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://23.254.228.60/historial-clinico-backend/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});
