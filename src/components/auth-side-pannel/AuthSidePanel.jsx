import React from "react";
import { LuPenLine, LuUsers, LuAward } from "react-icons/lu";
import authSideImage from "../../assets/auth-side-panel.jpg";

const features = [
  {
    icon: <LuPenLine size={15} />,
    title: "Easy Submission",
    desc: "Upload articles and images with just a few clicks",
  },
  {
    icon: <LuUsers size={15} />,
    title: "Expert Feedback",
    desc: "Receive guidance from faculty coordinators",
  },
  {
    icon: <LuAward size={15} />,
    title: "Get Published",
    desc: "See your work featured in the annual magazine",
  },
];

export default function AuthSidePanel() {
  return (
    <div className="hidden lg:flex flex-col relative w-full h-full overflow-hidden">

      {/* Background image */}
      <img
        src={authSideImage}
        alt="University Library"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark navy overlay — matches site primary */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(15,23,42,0.93) 0%, rgba(30,58,138,0.88) 50%, rgba(29,78,216,0.82) 100%)",
        }}
      />

      {/* Orange accent glow top-right */}
      <div
        className="absolute"
        style={{
          top: "-80px",
          right: "-80px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(245,124,0,0.12)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-between h-full"
        style={{ zIndex: 1, padding: "40px 44px" }}
      >

        {/* ── Brand ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              flexShrink: 0,
            }}
          >
            <svg fill="none" height="16" viewBox="0 0 32 32" width="16">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="white"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              Uni
              <span style={{ color: "#f57c00" }}>Magazine</span>
            </p>
            <p
              style={{
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Contribution Portal
            </p>
          </div>
        </div>

        {/* ── Hero text ── */}
        <div style={{ maxWidth: "340px" }}>
          {/* Orange pill tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(245,124,0,0.15)",
              border: "1px solid rgba(245,124,0,0.3)",
              color: "#fbbf24",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "999px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#f57c00",
                flexShrink: 0,
              }}
            />
            Spring 2026 Edition Open
          </div>

          <h1
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Share Your Story{" "}
            <span style={{ color: "#f57c00" }}>With the World</span>
          </h1>

          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
            }}
          >
            Join thousands of students contributing to our annual university
            magazine. Your voice matters, your ideas inspire.
          </p>
        </div>

        {/* ── Features ── */}
        <div>
          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.1)",
              marginBottom: "24px",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {features.map((f) => (
              <div
                key={f.title}
                style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
              >
                {/* Icon badge */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(245,124,0,0.15)",
                    border: "1px solid rgba(245,124,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#fbbf24",
                    marginTop: "1px",
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#fff",
                      marginBottom: "2px",
                    }}
                  >
                    {f.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.55,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "28px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              { val: "2,450+", lbl: "Contributors" },
              { val: "1,200+", lbl: "Published" },
              { val: "98%",    lbl: "Satisfaction" },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <p
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                    marginBottom: "3px",
                  }}
                >
                  {val}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {lbl}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}