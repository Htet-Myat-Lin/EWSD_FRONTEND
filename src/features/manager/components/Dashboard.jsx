import React from 'react'
import { useGetDashboardData } from '../hooks/useGetDashboardReports'
import { Spinner, Card, CardBody, CardHeader, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/react'
import { LuUsers, LuFileText, LuBuilding2, LuCalendarClock, LuEye } from 'react-icons/lu'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-gray-600">Contributions: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-bold text-gray-700">{payload[0].name}</p>
        <p className="text-gray-600">Contributors: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

const ExceptionAlertTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-gray-600">Uncommented Contributions: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

export const ManagerDashboard = () => {
  const { data: dashboardData, isPending } = useGetDashboardData()

  if (isPending) {
    return (
        <div className="flex justify-center items-center min-h-100">
            <Spinner size="lg" label="Loading dashboard..." />
        </div>
    )
  }

  console.log(dashboardData)
  const { total_users, active_users, total_contributions,  contributions_by_faculty = [] } = dashboardData || {}
  const total_faculties = contributions_by_faculty.length

  // Prepare data for bar chart (contribution count)
  const barChartData = contributions_by_faculty.map((faculty) => ({
    name: faculty.name,
    contributions: faculty.contributions_count,
  }))

  // Prepare data for pie chart (contributor count)
  const pieChartData = contributions_by_faculty.map((faculty) => ({
    name: faculty.name,
    value: faculty.contributors_count,
  }))

  // Prepare data for horizontal bar chart (exception alerts - show all faculties)
  const exceptionAlertData = contributions_by_faculty.map((faculty) => ({
    name: faculty.name,
    alerts: faculty.exception_alerts,
  }))

  // Get recent contributions
  const { recent_contributions = [] } = dashboardData || {}

  // Calculate totals for percentage calculation
  const totalContributions = contributions_by_faculty.reduce((sum, f) => sum + f.contributions_count, 0)

  return (
    <div className='max-w-7xl mx-auto py-14 px-4 sm:px-8'>
      {/* Overall Stats */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {/* Total Users */}
        <Card className="bg-linear-to-br from-cyan-500 to-cyan-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{total_users || 0}</p>
              </div>
              <LuUsers className="text-4xl text-cyan-200 opacity-80" />
            </div>
          </CardBody>
        </Card>
        {/* Total Contributions */}
        <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Contributions</p>
                <p className="text-3xl font-bold">{total_contributions || 0}</p>
              </div>
              <LuFileText className="text-4xl text-blue-200 opacity-80" />
            </div>
          </CardBody>
        </Card>

        {/* Active Contributors */}
        <Card className="bg-linear-to-br from-green-500 to-green-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Contributors</p>
                <p className="text-3xl font-bold">{active_users || 0}</p>
              </div>
              <LuUsers className="text-4xl text-green-200 opacity-80" />
            </div>
          </CardBody>
        </Card>

        {/* Faculties */}
        <Card className="bg-linear-to-br from-purple-500 to-purple-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Faculties</p>
                <p className="text-3xl font-bold">{total_faculties || 0}</p>
              </div>
              <LuBuilding2 className="text-4xl text-purple-200 opacity-80" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Faculty Distribution - Bar Chart & Pie Chart */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Left Side - Bar Chart (Contributions) */}
        <Card>
          <CardHeader className="font-bold text-lg">Contributions by Faculty</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="contributions">
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Right Side - Pie Chart (Contributors) */}
        <Card>
          <CardHeader className="font-bold text-lg">Contributors by Faculty</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Recent Contributions & Exception Alerts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {/* Left Side - Recent Contributions Table */}
        <Card>
          <CardHeader className="font-bold text-lg flex items-center gap-2">
            <LuFileText className="text-lg" />
            Recent Contributions
          </CardHeader>
          <CardBody className="max-h-96 overflow-auto">
            <Table aria-label="Recent contributions table" removeWrapper>
              <TableHeader>
                <TableColumn>Student</TableColumn>
                <TableColumn>Faculty</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {recent_contributions.slice(0, 5).map((contribution) => (
                  <TableRow key={contribution.id}>
                    <TableCell>{contribution.user?.name || '-'}</TableCell>
                    <TableCell>{contribution.faculty?.name || '-'}</TableCell>
                    <TableCell>
                      <span className="truncate max-w-37.5 block" title={contribution.title}>
                        {contribution.title}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contribution.status === 'selected' 
                          ? 'bg-green-100 text-green-800' 
                          : contribution.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contribution.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button className="p-1 hover:bg-default-100 rounded" title="View details">
                        <LuEye className="text-lg text-default-500" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* Right Side - Exception Alerts Horizontal Bar Chart */}
        <Card>
          <CardHeader className="font-bold text-lg flex items-center gap-2">
            Uncommented Contributions by Faculty
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={exceptionAlertData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={70} />
                <Tooltip content={<ExceptionAlertTooltip />} />
                <Bar dataKey="alerts" fill="#FF6B6B">
                  {exceptionAlertData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#FF6B6B' : '#FF8E8E'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Detailed Breakdown Table */}
      <div className='mt-6'>
        <Card>
          <CardHeader className="font-bold text-lg">Detailed Breakdown</CardHeader>
          <CardBody>
            <Table aria-label="Detailed breakdown table" removeWrapper>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Faculty</TableColumn>
                <TableColumn>Contributions</TableColumn>
                <TableColumn>Contributors</TableColumn>
                <TableColumn>No Comments</TableColumn>
                <TableColumn>% of Total</TableColumn>
              </TableHeader>
              <TableBody>
                {contributions_by_faculty.map((faculty) => {
                  const contributionPercent = totalContributions > 0 
                    ? ((faculty.contributions_count / totalContributions) * 100).toFixed(1) 
                    : 0
                  return (
                    <TableRow key={faculty.id}>
                      <TableCell>{faculty.id}</TableCell>
                      <TableCell className="font-medium">{faculty.name}</TableCell>
                      <TableCell>{faculty.contributions_count}</TableCell>
                      <TableCell>{faculty.contributors_count}</TableCell>
                      <TableCell>{faculty.exception_alerts}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-default-100 rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${contributionPercent}%` }}
                            />
                          </div>
                          <span className="text-sm">{contributionPercent}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}