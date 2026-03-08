import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { NavLink, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { HiMenu, HiX } from "react-icons/hi";
import { resolveProfileImageUrl } from "@/utils/profile-image";

// ─── Inline styles ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .kmd-navbar {
    background: rgba(255, 255, 255, 0.92) !important;
    backdrop-filter: blur(20px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
    box-shadow: 0 1px 40px rgba(0,0,0,0.06) !important;
  }

  .kmd-brand-name {
    font-weight: 700;
    font-size: 1.35rem;
    letter-spacing: -0.02em;
    color: #1e3a8a;
    line-height: 1;
  }

  .kmd-brand-tagline {
    font-size: 0.62rem;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #60a5fa;
    line-height: 1;
    margin-top: 2px;
  }

  .kmd-logo-mark {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 12px rgba(37, 99, 235, 0.28);
  }

  .kmd-nav-link {
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1e3a8a;
    padding: 6px 14px;
    border-radius: 4px;
    transition: all 0.25s ease;
    text-decoration: none !important;
    position: relative;
  }

  .kmd-nav-link::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 14px;
    right: 14px;
    height: 1.5px;
    background: #3b82f6;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  .kmd-nav-link:hover::after,
  .kmd-nav-link.active::after {
    transform: scaleX(1);
  }

  .kmd-nav-link:hover {
    color: #1d4ed8;
  }

  .kmd-nav-link.active {
    color: #1d4ed8;
    font-weight: 500;
  }

  .kmd-login-link {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1d4ed8;
    font-weight: 400;
    padding: 6px 12px;
    transition: color 0.2s;
    text-decoration: none;
  }

  .kmd-login-link:hover {
    color: #1d4ed8;
  }

  .kmd-signup-btn {
    font-size: 0.78rem !important;
    font-weight: 500 !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
    color: white !important;
    border: none !important;
    padding: 7px 20px !important;
    border-radius: 4px !important;
    box-shadow: 0 2px 12px rgba(37, 99, 235, 0.3) !important;
    transition: all 0.25s ease !important;
  }

  .kmd-signup-btn:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4) !important;
  }

  .kmd-avatar:hover {
    box-shadow: 0 3px 16px rgba(37, 99, 235, 0.35) !important;
  }

  .kmd-mobile-link {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1e3a8a;
    padding: 14px 16px;
    border-radius: 6px;
    transition: all 0.2s;
    display: block;
    text-decoration: none !important;
    border-bottom: 1px solid rgba(59,130,246,0.12);
  }

  .kmd-mobile-link:hover,
  .kmd-mobile-link.active {
    color: #1d4ed8;
    background: rgba(201, 168, 76, 0.08);
  }

  .kmd-issue-badge {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #9b8b6e;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 2px 8px;
    border-radius: 2px;
  }
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
export const AcmeLogo = () => (
  <RouterLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
    <div className="kmd-logo-mark">
      <svg fill="none" height="20" viewBox="0 0 32 32" width="20">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    </div>
    <div className="flex flex-col justify-center">
      <p className="kmd-brand-name">KMD</p>
      <p className="kmd-brand-tagline">University Magazine</p>
    </div>
  </RouterLink>
);

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();
  const profileImage = resolveProfileImageUrl(user?.profile_path);
  const navigate = useNavigate();

  const handleLogout = () => logout();

  const redirectToDashboard = () => {
    const routes = {
      admin: "/admin/dashboard",
      student: "/student/dashboard",
      marketing_coordinator: "/marketing-coordinator/dashboard",
      marketing_manager: "/marketing-manager/dashboard",
    };
    const route = routes[user?.role?.name];
    if (route) navigate(route);
  };

  const menuItems = [
    { name: "Home", route: "/" },
    { name: "Articles", route: "/articles" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
  ];

  return (
    <>
      <style>{styles}</style>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="kmd-navbar sticky top-0 z-50"
        maxWidth="xl"
        height="64px"
      >
        {/* ── Mobile: Toggle + Logo ── */}
        <NavbarContent className="sm:hidden gap-2">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            icon={isMenuOpen
              ? <HiX size={20} style={{ color: "#8b6914" }} />
              : <HiMenu size={20} style={{ color: "#4a3f2e" }} />
            }
          />
          <NavbarBrand>
            <AcmeLogo />
          </NavbarBrand>
        </NavbarContent>

        {/* ── Desktop: Logo ── */}
        <NavbarContent className="hidden sm:flex">
          <NavbarBrand>
            <AcmeLogo />
          </NavbarBrand>
        </NavbarContent>

        {/* ── Desktop: Nav + Auth ── */}
        <NavbarContent className="hidden sm:flex items-center gap-0" justify="end">

          {/* Issue badge */}
          {/* <NavbarItem className="mr-4">
            <span className="kmd-issue-badge">Spring 2026</span>
          </NavbarItem> */}

          {/* Nav links */}
          {menuItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <NavbarItem key={item.route}>
                <NavLink
                  to={item.route}
                  className={`kmd-nav-link ${isActive ? "active" : ""}`}
                >
                  {item.name}
                </NavLink>
              </NavbarItem>
            );
          })}

          {/* Auth */}
          {user ? (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="kmd-avatar transition-transform"
                    name={user?.name}
                    src={profileImage}
                    color="primary"
                    isBordered
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  className="font-[DM_Sans]"
                >
                  <DropdownItem key="profile" className="h-14 gap-2 opacity-70" isReadOnly>
                    <p className="text-xs uppercase tracking-widest text-default-500 font-light">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-default-700 truncate">
                      {user?.email}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    key="dashboard"
                    onPress={redirectToDashboard}
                    className="text-sm tracking-wide"
                  >
                    Dashboard
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={handleLogout}
                    className="text-sm tracking-wide"
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
              <NavbarItem>
                <Button
                  as={NavLink}
                  to="/login"
                  className="kmd-signup-btn"
                  size="sm"
                >
                  Sign In
                </Button>
              </NavbarItem>
          )}
        </NavbarContent>

        {/* ── Mobile Menu ── */}
        <NavbarMenu
          style={{
            background: "rgba(255,252,245,0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(180,160,120,0.2)",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          {/* Issue label */}
          <div className="px-4 mb-4">
            <span className="kmd-issue-badge">Spring 2026</span>
          </div>

          <div className="flex flex-col">
            {menuItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <NavbarMenuItem key={item.route}>
                  <NavLink
                    to={item.route}
                    className={`kmd-mobile-link ${isActive ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </NavbarMenuItem>
              );
            })}
          </div>

          {/* Mobile auth */}
          <div className="mt-6 px-4 flex flex-col gap-3">
            {user ? (
              <>
                <p className="text-xs uppercase tracking-widest text-default-400 font-light mb-1">
                  {user?.email}
                </p>
                <Button
                  fullWidth
                  variant="flat"
                  onPress={() => { redirectToDashboard(); setIsMenuOpen(false); }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    background: "rgba(201,168,76,0.1)",
                    color: "#8b6914",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  fullWidth
                  color="danger"
                  variant="flat"
                  onPress={handleLogout}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="kmd-mobile-link text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <Button
                  as={NavLink}
                  to="/register"
                  fullWidth
                  className="kmd-signup-btn"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
}