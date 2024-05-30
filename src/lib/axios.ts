import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const request = axios.create({
  baseURL: process.env.baseUrl || "",
  timeout: 5000,
});

export default request;
