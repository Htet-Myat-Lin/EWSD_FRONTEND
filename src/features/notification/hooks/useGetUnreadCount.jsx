import { NotificationService } from "@/api/services/notification-service"
import { useQuery } from "@tanstack/react-query"

export const useGetUnreadCount = () => {
    return useQuery({
        queryKey: ["unread-notifications"],
        queryFn: NotificationService.getUnreadCount,
        retry: 1,
        refetchOnWindowFocus: false,
        throwOnError: false
    })
}