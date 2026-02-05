import { axiosInstance } from "../axios-instance"

export const AuthService = {
    login: async(payload) => {
        return (await axiosInstance.post("/login", payload)).data
    },

    register: async(payload) => {
        return (await axiosInstance.post("/register", payload)).data
    },
}