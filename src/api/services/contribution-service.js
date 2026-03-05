import { axiosInstance } from "../axios-instance"

export const ContributionService = {
    storeContribution: async (payload) => {
        return (await axiosInstance.postForm("/contributions", payload)).data
    },

    getContribution: async (id) => {
        return (await axiosInstance.get(`/contributions/${id}`)).data
    },

    getContributions: async (page, status, categoryId, search) => {
        const params = {}
        
        if (page !== undefined) {
            params.page = page
        }
    
        if (status !== undefined && status !== null) {
            params.status = status
        }

        if (categoryId !== undefined && categoryId !== null) {
            params.category_id = categoryId
        }

        if (search !== undefined && search !== null && search.trim() !== '') {
            params.search = search.trim()
        }
        
        const response = (await axiosInstance.get("/contributions", { params })).data

        // Normalise the two possible response shapes:
        // 1. Empty result: { status, message, data: [], meta: { current_page, total } }
        // 2. Laravel paginator: { data: [...], current_page, last_page, total, ... }
        if (response.meta) {
            // Shape 1 – already normalised, just fill in missing last_page
            return {
                data: response.data ?? [],
                meta: {
                    current_page: response.meta.current_page ?? 1,
                    last_page: response.meta.last_page ?? 1,
                    total: response.meta.total ?? 0,
                },
            }
        }

        // Shape 2 – raw Laravel paginator
        return {
            data: response.data ?? [],
            meta: {
                current_page: response.current_page ?? 1,
                last_page: response.last_page ?? 1,
                total: response.total ?? 0,
            },
        }
    },

    selectContributions: async (ids, action) => {
        return (await axiosInstance.patch("/contributions/select", { ids, action })).data
    },

    updateContribution: async (id, payload) => {
        return (await axiosInstance.postForm(`/contributions/${id}`, {
            ...payload,
            _method: "PUT",
        })).data
    },
}
