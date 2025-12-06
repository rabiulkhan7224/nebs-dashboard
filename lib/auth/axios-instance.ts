import axios from "axios";

const api = axios.create({
  baseURL: "https://nebs-backend.vercel.app/v1/api",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor  access token 
// api.interceptors.request.use((config) => {
//   const token = cookies().get("access_token")?.value;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api

// function cookies() {
//     throw new Error("Function not implemented.");
// }


