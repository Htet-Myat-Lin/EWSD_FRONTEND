import { CgLock } from 'react-icons/cg'
import { FaClipboardCheck } from 'react-icons/fa'
import { HiTrendingUp } from 'react-icons/hi'
import { HiOutlineClock } from 'react-icons/hi2'
import { LuFileText } from 'react-icons/lu'
import ContributionsTable from './ContributionsTable'
import { TbUserSquare } from 'react-icons/tb'


export default function StatisticsPreview() {
  const stats= [
    {
      icon: <LuFileText className="w-6 h-6 text-white" />,
      label: 'Total Contributions',
      value: '2,547',
      change: '+12.5%',
      changeColor: 'green',
      bgColor: 'bg-blue-600',
    },
    {
      icon: <TbUserSquare className="w-6 h-6 text-white" />,
      label: 'Active Contributors',
      value: '156',
      change: '+8.2%',
      changeColor: 'green',
      bgColor: 'bg-green-600',
    },
    {
      icon: <FaClipboardCheck className="w-6 h-6 text-white" />,
      label: 'Review Rate',
      value: '94%',
      change: '+3.1%',
      changeColor: 'green',
      bgColor: 'bg-purple-600',
    },
    {
      icon: <HiOutlineClock className="w-6 h-6 text-white" />,
      label: 'Avg. Review Time',
      value: '3.2 days',
      change: '-15%',
      changeColor: 'blue',
      bgColor: 'bg-orange-600',
    },
  ]

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <HiTrendingUp className="w-4 h-4" />
            Real-Time Analytics
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Statistics Preview
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Track contributions, reviews, and deadlines with comprehensive analytics
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className={`${stat.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                {stat.icon}
              </div>

              <p className="text-gray-600 text-sm font-medium mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-foreground mb-4">
                {stat.value}
              </p>

              <span
                className={`text-sm font-semibold ${
                  stat.changeColor === 'green' ? 'text-green-600' : 'text-blue-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ContributionsTable />
    </section>
  )
}

