import { axiosInstance } from "../axios-instance"

export const CategoryService = {
    getCategories: async () => {
        return (await axiosInstance.get("/categories")).data
    },
}
