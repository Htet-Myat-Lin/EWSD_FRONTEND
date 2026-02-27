import { axiosInstance } from "../axios-instance";

export const commentService = {
  addComment: async (contributionId, content) => {
    return (await axiosInstance.post(`/contributions/${contributionId}/comments`, { content })).data
  },

  getContributionComments: async(contributionId) => {
    return (await axiosInstance.get(`/contributions/${contributionId}/comments`)).data
  },

  deleteComment: async(commentId) => {
    return (await axiosInstance.delete(`/comments/${commentId}`)).data
  },

  editComment: async(commentId, content) => {
    return (await axiosInstance.patch(`/comments/${commentId}`, { content })).data
  }
};
