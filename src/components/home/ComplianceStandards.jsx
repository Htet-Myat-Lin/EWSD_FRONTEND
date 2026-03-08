'use client';

import { CgLock } from 'react-icons/cg';

export default function ComplianceStandards() {
  const certifications = [
    {
      name: 'GDPR',
      status: 'Compliant',
      color: '#3b82f6',
    },
    {
      name: 'ISO 27001',
      status: 'Certified',
      color: '#22c55e',
    },
    {
      name: 'FERPA',
      status: 'Compliant',
      color: '#7c3aed',
    },
    {
      name: 'SOC 2',
      status: 'Type II',
      color: '#ff6b35',
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Compliance Container */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Compliance & Standards
            </h2>
            <p className="text-lg text-slate-600">
              Built to meet educational institution requirements
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: cert.color }}
                >
                  {cert.name}
                </div>
                <div className="text-slate-600 text-sm">
                  {cert.status}
                </div>
              </div>
            ))}
          </div>

          {/* Data Sovereignty Info */}
          <div className="bg-white rounded-xl p-6 flex items-start gap-4">
            <div className="flex-shrink-0">
              <CgLock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">
                Data Sovereignty:
              </h3>
              <p className="text-slate-600 text-sm">
                All university data is stored in secure, geographically appropriate data centers with 256-bit encryption and regular third-party security audits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
