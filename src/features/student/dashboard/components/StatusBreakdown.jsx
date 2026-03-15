import { Card, CardBody, Chip } from "@heroui/react"
import { FiClock, FiMessageCircle, FiStar, FiXCircle } from "react-icons/fi"
import { STATUS_COLORS } from "../../../../utils/helpers"

const StatusCard = ({ icon: Icon, label, count, status }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className={`p-3 rounded-full bg-${STATUS_COLORS[status]}/10`}>
                    <Icon className={`text-2xl text-${STATUS_COLORS[status]}`} />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                    <p className="text-2xl font-bold">{count}</p>
                </div>
                <Chip color={STATUS_COLORS[status]} variant="flat" size="sm">
                    {status}
                </Chip>
            </CardBody>
        </Card>
    )
}

export const StatusBreakdown = ({ breakdown }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard
                icon={FiClock}
                label="Pending Review"
                count={breakdown.pending}
                status="pending"
            />
            <StatusCard
                icon={FiMessageCircle}
                label="Commented"
                count={breakdown.commented}
                status="commented"
            />
            <StatusCard
                icon={FiStar}
                label="Selected"
                count={breakdown.selected}
                status="selected"
            />
            <StatusCard
                icon={FiXCircle}
                label="Rejected"
                count={breakdown.rejected}
                status="rejected"
            />
        </div>
    )
}
