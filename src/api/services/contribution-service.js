import { axiosInstance } from "../axios-instance"

export const ContributionService = {
    storeContribution: async (payload) => {
        return (await axiosInstance.postForm("/contributions", payload)).data
    },

    getContributions: async (page, status) => {
        const params = {}
        
        if (page !== undefined) {
            params.page = page
        }
    
        
        if (status !== undefined && status !== null) {
            params.status = status
        }
        
        return (await axiosInstance.get("/contributions", { params })).data
    },
}
