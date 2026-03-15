import { Spinner } from "@heroui/react"
import { useStudentDashboard } from "../hooks/useStudentDashboard"
import { AcademicYearBanner } from "./AcademicYearBanner"
import { ActionButtons } from "./ActionButtons"
import { PersonalMetrics } from "./PersonalMetrics"
import { FacultyComparison } from "./FacultyComparison"
import { StatusBreakdown } from "./StatusBreakdown"
import { RecentActivity } from "./RecentActivity"
import { NotificationsPanel } from "./NotificationsPanel"

export const StudentDashboard = () => {
    const { data, isLoading, error } = useStudentDashboard()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size="lg" label="Loading dashboard..." />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-500 text-lg">Failed to load dashboard</p>
                    <p className="text-gray-500 text-sm mt-2">{error.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-2">
            <div className="max-w-full space-y-6">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex-1 w-full md:w-auto">
                        <AcademicYearBanner academicYear={data.academic_year} />
                    </div>
                    <ActionButtons />
                </div>

                {/* Student Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Welcome, {data.student_info.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {data.student_info.faculty}
                    </p>
                </div>

                {/* Personal Metrics */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Your Performance</h2>
                    <PersonalMetrics metrics={data.personal_metrics} />
                </section>

                {/* Faculty Comparison */}
                <section>
                    <FacultyComparison 
                        comparison={data.faculty_comparison} 
                        personalMetrics={data.personal_metrics}
                    />
                </section>

                {/* Status Breakdown */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Submission Status</h2>
                    <StatusBreakdown breakdown={data.status_breakdown} />
                </section>

                {/* Recent Activity & Notifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentActivity activities={data.recent_activity} />
                    <NotificationsPanel notifications={data.notifications} />
                </div>
            </div>
        </div>
    )
}
