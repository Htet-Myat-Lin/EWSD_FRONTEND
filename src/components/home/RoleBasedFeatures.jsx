import { FaCheckCircle, FaClipboardList, FaGraduationCap } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { TbUserSquare } from 'react-icons/tb';

const roles = [
  {
    title: 'Students',
    description: 'Submit contributions and track review status',
    icon: FaGraduationCap,
    badge: 'Standard Access',
    badgeColor: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-600',
    features: [
      'Upload articles with images',
      'View submission status in real-time',
      'Receive feedback notifications',
      'Track publication history',
      'Edit before deadline',
    ],
  },
  {
    title: 'Marketing Coordinators',
    description: 'Review submissions and provide feedback',
    icon: FaClipboardList,
    badge: 'Faculty Access',
    badgeColor: 'bg-purple-100 text-purple-700',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-600',
    features: [
      'Review faculty submissions',
      'Comment within 14 days',
      'Approve or request revisions',
      'Track review deadlines',
      'Export contribution reports',
    ],
  },
  {
    title: 'Marketing Manager',
    description: 'Oversee process and publish magazines',
    icon: TbUserSquare,
    badge: 'Manager Access',
    badgeColor: 'bg-green-100 text-green-700',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-600',
    features: [
      'View all faculty submissions',
      'Download selected contributions',
      'View all faculty reports',
    ],
  },
  {
    title: 'Administrator',
    description: 'System configuration and user management',
    icon: LuSettings,
    badge: 'Full Access',
    badgeColor: 'bg-orange-100 text-orange-700',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-600',
    features: [
      'Manage user accounts',
      'Set submission deadlines',
      'Configure faculty settings',
      'View system analytics',
      'Backup and security controls',
    ],
  },
];

export default function RoleBasedFeatures() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Role-Based Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Tailored functionality for each user role with appropriate security levels
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className={`${role.bgColor} ${role.borderColor} border-2 rounded-2xl p-6 flex flex-col`}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className={`${role.iconBg} w-16 h-16 rounded-xl flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-foreground mb-2">{role.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{role.description}</p>

                {/* Access Badge */}
                <div className={`${role.badgeColor} inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 w-fit`}>
                  {role.badge}
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'inherit' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* RBAC Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex gap-4">
          <div className="flex-shrink-0">
            <LuSettings className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-foreground mb-2">
              Secure Role-Based Access Control (RBAC)
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              Each role has specific permissions enforced at the system level. Users can only access features and data
              relevant to their role, ensuring data security and workflow integrity. All actions are logged for audit
              purposes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
