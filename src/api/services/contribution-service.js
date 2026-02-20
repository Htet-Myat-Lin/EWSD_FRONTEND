import { axiosInstance } from "../axios-instance"

export const ContributionService = {
    storeContribution: async (payload) => {
        return (await axiosInstance.postForm("/contributions", payload)).data
    },
}
