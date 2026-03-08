export default function ContributionsTable() {
  const data = [
    { faculty: 'Business', submissions: 45, approved: 38, pending: 7, rate: 84 },
    { faculty: 'Engineering', submissions: 52, approved: 45, pending: 7, rate: 87 },
    { faculty: 'Arts & Sciences', submissions: 38, approved: 32, pending: 6, rate: 84 },
    { faculty: 'Medicine', submissions: 41, approved: 35, pending: 6, rate: 85 },
    { faculty: 'Law', submissions: 29, approved: 25, pending: 4, rate: 86 },
  ]

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Contributions by Faculty
          </h3>
          <p className="text-muted-foreground text-sm">
            Current academic year performance
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Approved
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {row.faculty}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {row.submissions}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-green-600 font-semibold">{row.approved}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-yellow-600 font-semibold">{row.pending}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${row.rate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-foreground w-12">
                          {row.rate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
