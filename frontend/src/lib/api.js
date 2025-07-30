import { axiosInstance } from "./axios";

export const registerApi = (payload) => axiosInstance.post("/auth/register", payload);
export const loginApi = (payload) => axiosInstance.post("/auth/login", payload);
export const meApi = () => axiosInstance.get("/user/landing");
