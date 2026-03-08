import { CgBell, CgCalendar, CgClipboard, CgDatabase, CgFileAdd, CgLock, CgShield } from 'react-icons/cg';
import ComplianceStandards from './ComplianceStandards';

export default function SecurityCompliance() {
  const features = [
    {
      icon: CgFileAdd,
      title: 'Secure File Uploads',
      description: 'Encrypted file storage with virus scanning. Support for DOC, DOCX, and PDF formats with size limits.',
      color: '#3b82f6',
    },
    {
      icon: CgLock,
      title: 'Role-Based Permissions',
      description: 'Granular access control ensures users only see and modify data relevant to their role.',
      color: '#7c3aed',
    },
    {
      icon: CgCalendar,
      title: 'Closure Date Enforcement',
      description: 'Automatic deadline enforcement. No submissions accepted after closure. Final closure locks all data.',
      color: '#22c55e',
    },
    {
      icon: CgDatabase,
      title: 'Data Protection',
      description: 'Regular backups, data encryption at rest and in transit. GDPR compliant data handling.',
      color: '#ef4444',
    },
    {
      icon: CgBell,
      title: 'Email Notifications',
      description: 'Automated alerts for submissions, reviews, deadlines, and approvals. Keep everyone informed.',
      color: '#ff6b35',
    },
    {
      icon: CgClipboard,
      title: 'Audit Trail',
      description: 'Complete logging of all actions. Track who did what and when for compliance and accountability.',
      color: '#14b8a6',
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-12">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <CgShield className="w-4 h-4" />
              Enterprise Security
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Security & Compliance
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            University-grade security features to protect your data and ensure compliance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: feature.color + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <ComplianceStandards />
    </section>
  );
}
