import axios from "axios";

let LocalURL = "http://localhost:8080";
let ProdAWSURL = "https://api.loyallocker.com";
let ProdVercelURL = "https://loyal-locker-be.vercel.app";

const API = axios.create({
  baseURL: `${LocalURL}/api/v2`,
  withCredentials: true,
});

export default API;
