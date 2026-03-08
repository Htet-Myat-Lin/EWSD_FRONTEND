import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiMiniAcademicCap,
} from "react-icons/hi2";

const quickLinks = ["Home", "About System", "Contact Support", "Terms & Conditions"];
const resources = ["User Guide", "FAQ", "Privacy Policy", "Help Center"];

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center shadow-lg shadow-blue-900/40">
                <svg
                  fill="none"
                  height="40"
                  viewBox="0 0 32 32"
                  width="40"
                  className="text-primary drop-shadow-sm"
                >
                  <path
                    clipRule="evenodd"
                    d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <p className="text-lg font-semibold">UniMag</p>
                <p className="text-sm text-slate-400">Contribution System</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              Secure magazine contribution management platform for universities.
              Streamline submissions, reviews, and publications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    className="hover:text-white transition-colors duration-150"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {resources.map((item) => (
                <li key={item}>
                  <a
                    className="hover:text-white transition-colors duration-150"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <HiOutlineMapPin className="w-5 h-5 mt-0.5 text-blue-400" />
              <div>
                University Marketing Office, Main
                <br />
                Campus
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <HiOutlineEnvelope className="w-5 h-5 text-blue-400" />
              <a className="hover:text-white" href="mailto:support@unimag.edu">
                support@unimag.edu
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <HiOutlinePhone className="w-5 h-5 text-blue-400" />
              <a className="hover:text-white" href="tel:+15551234567">
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex items-center gap-4 pt-2 text-slate-300">
              {[
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaLinkedinIn, label: "LinkedIn" },
                { icon: FaInstagram, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-blue-500 hover:text-white hover:bg-blue-500/10 transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-between text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} University Magazine Contribution System.
            All rights reserved.
          </p>
          <p className="text-slate-500">
            Developed with Agile methodologies for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
