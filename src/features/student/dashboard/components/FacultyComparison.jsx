import { Card, CardBody, CardHeader } from "@heroui/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export const FacultyComparison = ({ comparison, personalMetrics }) => {
    const data = [
        {
            name: "Selection Rate",
            "Your Rate": parseFloat(personalMetrics?.selection_rate) || 0,
            "Faculty Average": parseFloat(comparison?.average_faculty_selection_rate) || 0,
        },
        {
            name: "Rejection Rate",
            "Your Rate": parseFloat(personalMetrics?.rejection_rate) || 0,
            "Faculty Average": parseFloat(comparison?.average_faculty_rejection_rate) || 0,
        },
    ]

    return (
        <Card>
            <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold">Faculty Comparison</h3>
            </CardHeader>
            <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis 
                            dataKey="name" 
                            className="text-sm"
                            tick={{ fill: 'currentColor' }}
                        />
                        <YAxis 
                            className="text-sm"
                            tick={{ fill: 'currentColor' }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Your Rate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Faculty Average" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your contribution share: <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {comparison?.your_contribution_share}
                        </span>
                    </p>
                </div>
            </CardBody>
        </Card>
    )
}
