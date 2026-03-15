import { useQuery } from "@tanstack/react-query"
import { ContributionService } from "../../../../api/services/contribution-service"

export const useStudentDashboard = () => {
    return useQuery({
        queryKey: ["student-dashboard"],
        queryFn: ContributionService.getStudentDashboard,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    })
}
