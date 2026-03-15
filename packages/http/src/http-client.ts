import { default as axios } from "axios";

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { httpClient };
