import { axiosInstance } from "../axios-instance"
import { toFormData } from "../../utils/to-form-data"

export const UserService = {
    getUsers: async (page = 1) => {
        return (await axiosInstance.get("/users", { params: { page } })).data
    },
    createUser: async (payload) => {
        return (await axiosInstance.post("/users", payload)).data
    },
    updateUser: async (id, payload) => {
        return (await axiosInstance.put(`/users/${id}`, payload)).data
    },
    updateUserStatus: async (id, status) => {
        return (await axiosInstance.patch(`/users/${id}/status`, {
            status,
            confirm_action: true,
        })).data
    },
    updatePassword: async (id, payload) => {
        return (await axiosInstance.patch(`/users/${id}/password`, payload)).data
    },
    updateProfile: async (id, payload) => {
        return (await axiosInstance.post(`/users/${id}/profile`, toFormData(payload))).data
    },
    getFacultyStudents: async (page = 1) => {
        return (await axiosInstance.get("/faculty/students", { params: { page } })).data
    },
}
