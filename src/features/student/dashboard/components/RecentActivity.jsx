import { Card, CardBody, CardHeader, Chip } from "@heroui/react"
import { formatDate, STATUS_COLORS } from "../../../../utils/helpers"
import { FiFileText } from "react-icons/fi"

export const RecentActivity = ({ activities }) => {
    if (!activities || activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                </CardHeader>
                <CardBody>
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                </CardBody>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
            </CardHeader>
            <CardBody className="gap-3">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                            <FiFileText className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{activity.title}</p>
                            <p className="text-sm text-gray-500">
                                {formatDate(activity.created_at)}
                            </p>
                        </div>
                        <Chip
                            color={STATUS_COLORS[activity.status]}
                            variant="flat"
                            size="sm"
                        >
                            {activity.status}
                        </Chip>
                    </div>
                ))}
            </CardBody>
        </Card>
    )
}
