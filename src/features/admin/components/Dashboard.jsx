import React from 'react'
import { useGetDashboardData } from '../hooks/useGetDashboardData'
import { Spinner, Card, CardBody, CardHeader, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/react'
import { LuUsers, LuFileText, LuBuilding2, LuCalendarClock, LuEye } from 'react-icons/lu'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'

const COLORS = ['#378ADD','#1D9E75','#7F77DD','#639922','#D85A30','#BA7517']

const StatCard = ({ label, value, color, icon }) => {
  const themes = {
    blue:   { card:'bg-[#E6F1FB]', label:'text-[#185FA5]', val:'text-[#0C447C]', icon:'bg-[#B5D4F4] text-[#185FA5]' },
    teal:   { card:'bg-[#E1F5EE]', label:'text-[#0F6E56]', val:'text-[#085041]', icon:'bg-[#9FE1CB] text-[#0F6E56]' },
    green:  { card:'bg-[#EAF3DE]', label:'text-[#3B6D11]', val:'text-[#27500A]', icon:'bg-[#C0DD97] text-[#3B6D11]' },
    purple: { card:'bg-[#EEEDFE]', label:'text-[#534AB7]', val:'text-[#3C3489]', icon:'bg-[#CECBF6] text-[#534AB7]' },
    amber:  { card:'bg-[#FAEEDA]', label:'text-[#854F0B]', val:'text-[#633806]', icon:'bg-[#FAC775] text-[#854F0B]' },
  }
  const t = themes[color]
  return (
    <div className={`${t.card} rounded-xl p-4 flex flex-col gap-2.5`}>
      <div className={`${t.icon} w-8 h-8 rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className={`text-[11px] font-medium ${t.label}`}>{label}</p>
        <p className={`text-2xl font-medium ${t.val}`}>{value}</p>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label, suffix }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-2.5 text-xs">
      <p className="font-medium text-gray-700 mb-0.5">{label}</p>
      <p className="text-gray-500">{payload[0].value} {suffix}</p>
    </div>
  )
}

const Dashboard = () => {
  const { data: dashboardData, isPending } = useGetDashboardData()

  if (isPending) return (
    <div className="flex justify-center items-center min-h-96">
      <Spinner size="lg" label="Loading dashboard..." />
    </div>
  )

  const { total_users, active_users, total_contributions, days_to_closure, contributions_by_faculty, recent_contributions } = dashboardData
  const total_faculties = contributions_by_faculty.length
  const totalContributions = contributions_by_faculty.reduce((s, f) => s + f.contributions_count, 0)

  const barData = contributions_by_faculty.map(f => ({ name: f.name, contributions: f.contributions_count }))
  const pieData = contributions_by_faculty.map(f => ({ name: f.name, value: f.contributors_count }))
  const hbarData = contributions_by_faculty.map(f => ({ name: f.name, alerts: f.exception_alerts }))

  const statusBadge = (status) => {
    const map = {
      selected: 'bg-[#EAF3DE] text-[#3B6D11]',
      pending:  'bg-[#FAEEDA] text-[#854F0B]',
    }
    return map[status] ?? 'bg-[#F1EFE8] text-[#5F5E5A]'
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Total users"          value={total_users}          color="blue"   icon={<LuUsers size={15}/>} />
        <StatCard label="Contributions"        value={total_contributions}  color="teal"   icon={<LuFileText size={15}/>} />
        <StatCard label="Active contributors"  value={active_users}         color="green"  icon={<LuUsers size={15}/>} />
        <StatCard label="Faculties"            value={total_faculties}      color="purple" icon={<LuBuilding2 size={15}/>} />
        <StatCard label="Days to closure"      value={days_to_closure}      color="amber"  icon={<LuCalendarClock size={15}/>} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border border-default-100 shadow-none">
          <CardHeader className="text-[13px] font-medium pb-0">Contributions by faculty</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip suffix="contributions" />} />
                <Bar dataKey="contributions" radius={[4,4,0,0]}>
                  {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="border border-default-100 shadow-none">
          <CardHeader className="text-[13px] font-medium pb-0">Contributors by faculty</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} innerRadius={48} dataKey="value" labelLine={false}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip suffix="contributors" />} />
                <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Table + hbar row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border border-default-100 shadow-none">
          <CardHeader className="text-[13px] font-medium flex items-center gap-1.5">
            <LuFileText size={14} /> Recent contributions
          </CardHeader>
          <CardBody className="p-0">
            <Table aria-label="Recent contributions" removeWrapper>
              <TableHeader>
                <TableColumn className="text-[11px]">Student</TableColumn>
                <TableColumn className="text-[11px]">Faculty</TableColumn>
                <TableColumn className="text-[11px]">Title</TableColumn>
                <TableColumn className="text-[11px]">Status</TableColumn>
              </TableHeader>
              <TableBody>
                {recent_contributions.slice(0, 5).map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="text-xs">{c.user?.name || '-'}</TableCell>
                    <TableCell className="text-xs text-default-400">{c.faculty?.name || '-'}</TableCell>
                    <TableCell className="text-xs max-w-30 truncate">{c.title}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${statusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Card className="border border-default-100 shadow-none">
          <CardHeader className="text-[13px] font-medium pb-0">Uncommented contributions by faculty</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={contributions_by_faculty.length * 40 + 40}>
              <BarChart data={hbarData} layout="vertical" margin={{ top: 0, right: 16, left: 60, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={56} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip suffix="uncommented" />} />
                <Bar dataKey="alerts" radius={[0,4,4,0]}>
                  {hbarData.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? '#E24B4A' : '#F09595'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Breakdown table */}
      <Card className="border border-default-100 shadow-none">
        <CardHeader className="text-[13px] font-medium">Detailed breakdown</CardHeader>
        <CardBody className="p-0">
          <Table aria-label="Breakdown" removeWrapper>
            <TableHeader>
              <TableColumn className="text-[11px]">#</TableColumn>
              <TableColumn className="text-[11px]">Faculty</TableColumn>
              <TableColumn className="text-[11px]">Contributions</TableColumn>
              <TableColumn className="text-[11px]">Contributors</TableColumn>
              <TableColumn className="text-[11px]">No comments</TableColumn>
              <TableColumn className="text-[11px] w-36">% of total</TableColumn>
            </TableHeader>
            <TableBody>
              {contributions_by_faculty.map((f, i) => {
                const pct = totalContributions > 0 ? ((f.contributions_count / totalContributions) * 100).toFixed(1) : 0
                return (
                  <TableRow key={f.id}>
                    <TableCell className="text-xs text-default-300">{i + 1}</TableCell>
                    <TableCell className="text-xs font-medium">{f.name}</TableCell>
                    <TableCell className="text-xs">{f.contributions_count}</TableCell>
                    <TableCell className="text-xs">{f.contributors_count}</TableCell>
                    <TableCell className="text-xs">{f.exception_alerts}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-default-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#378ADD]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[11px] text-default-400 w-8 text-right">{pct}%</span>
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
  )
}

export default Dashboard
