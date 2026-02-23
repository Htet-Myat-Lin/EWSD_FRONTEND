import { useQuery } from '@tanstack/react-query'
import { ContributionService } from '@/api/services/contribution-service'

export const useContributions = (page = 1, status = null) => {
    return useQuery({
        queryKey: ['contributions', page, status],
        queryFn: () => ContributionService.getContributions(page, status),
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
    })
}
