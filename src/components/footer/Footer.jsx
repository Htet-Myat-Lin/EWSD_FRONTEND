import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuFacebook,
  LuTwitter,
  LuInstagram,
  LuLinkedin,
} from "react-icons/lu";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@400;600&display=swap');

  .ft-root {
    background: #0f172a;
    color: #9ca3af;
    padding: 64px 0 32px;
    font-family: 'DM Sans', sans-serif;
  }

  .ft-brand {
    font-family: 'Lora', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
  }

  .ft-brand span { color: #f57c00; }

  .ft-brand-desc {
    font-size: 0.875rem;
    line-height: 1.65;
    color: #9ca3af;
    margin-bottom: 20px;
  }

  .ft-social {
    display: flex;
    gap: 8px;
  }

  .ft-social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    color: #9ca3af;
    text-decoration: none;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .ft-social a:hover {
    background: rgba(245,124,0,0.15);
    color: #f57c00;
  }

  .ft-col h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 16px;
    letter-spacing: 0.04em;
  }

  .ft-col a {
    display: block;
    font-size: 0.875rem;
    color: #9ca3af;
    text-decoration: none;
    margin-bottom: 10px;
    transition: color 0.2s;
  }

  .ft-col a:hover { color: #f57c00; }

  .ft-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.875rem;
    color: #9ca3af;
    margin-bottom: 12px;
  }

  .ft-contact-icon {
    color: #f57c00;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .ft-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 48px 0 24px;
  }

  .ft-copy {
    text-align: center;
    font-size: 0.8rem;
    color: #6b7280;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer({ footerQuickLinks, footerSupport }) {
  const quickLinks = footerQuickLinks ?? [
    { label: "About Us",               to: "/about" },
    { label: "Submission Guidelines",  to: "#" },
    { label: "Editorial Board",        to: "#" },
    { label: "Past Publications",      to: "#" },
  ];

  const supportLinks = footerSupport ?? [
    { label: "FAQ",                to: "#" },
    { label: "Help Center",        to: "#" },
    { label: "Contact Us",         to: "/contact" },
    { label: "Technical Support",  to: "#" },
  ];

  const contactItems = [
    { icon: <LuMapPin size={14} />, text: "123 University Ave, Academic City, AC 12345" },
    { icon: <LuPhone size={14} />,  text: "+1 (555) 123-4567" },
    { icon: <LuMail size={14} />,   text: "submissions@unimagazine.edu" },
  ];

  return (
    <>
      <style>{styles}</style>
      <footer className="ft-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="ft-brand">
                Uni<span>Magazine</span>
              </div>
              <p className="ft-brand-desc">
                Empowering student voices through academic publishing since 2020.
              </p>
              <div className="ft-social">
                <a href="#" aria-label="Facebook"><LuFacebook size={15} /></a>
                <a href="#" aria-label="Twitter"><LuTwitter size={15} /></a>
                <a href="#" aria-label="Instagram"><LuInstagram size={15} /></a>
                <a href="#" aria-label="LinkedIn"><LuLinkedin size={15} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="ft-col">
              <h4>Quick Links</h4>
              {quickLinks.map((l) => (
                <RouterLink key={l.label} to={l.to}>
                  {l.label}
                </RouterLink>
              ))}
            </div>

            {/* Support */}
            <div className="ft-col">
              <h4>Support</h4>
              {supportLinks.map((l) => (
                <RouterLink key={l.label} to={l.to}>
                  {l.label}
                </RouterLink>
              ))}
            </div>

            {/* Contact */}
            <div className="ft-col">
              <h4>Contact Us</h4>
              {contactItems.map(({ icon, text }) => (
                <div key={text} className="ft-contact-item">
                  <span className="ft-contact-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>

          <hr className="ft-divider" />
          <p className="ft-copy">
            &copy; 2026 University Magazine. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}