import axios from "axios";

export const http = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images'
});
