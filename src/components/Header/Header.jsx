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
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { NavLink, Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { HiMenu, HiX } from "react-icons/hi";
import { resolveProfileImageUrl } from "@/utils/helpers";

// ─── Inline styles ────────────────────────────────────────────────────────────
const styles = `
  .kmd-navbar {
    background: #ffffff !important;
    border-bottom: 1px solid #f0f0f0 !important;
    box-shadow: none !important;
  }

  .kmd-brand {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-decoration: none;
    line-height: 1;
  }

  .kmd-brand-uni  { color: #1a237e; }
  .kmd-brand-mag  { color: #f57c00; }

  .kmd-nav-link {
    font-size: 0.875rem;
    font-weight: 400;
    color: #374151;
    padding: 4px 2px;
    text-decoration: none !important;
    position: relative;
    transition: color 0.2s;
  }

  .kmd-nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #f57c00;
    border-radius: 1px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  .kmd-nav-link:hover { color: #111827; }

  .kmd-nav-link:hover::after,
  .kmd-nav-link.active::after { transform: scaleX(1); }

  .kmd-nav-link.active {
    color: #f57c00;
    font-weight: 500;
  }

  .kmd-login-btn {
    font-size: 0.875rem;
    font-weight: 400;
    color: #374151;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    padding: 4px 8px !important;
    min-width: unset !important;
    transition: color 0.2s;
    text-decoration: none;
  }

  .kmd-login-btn:hover { color: #111827 !important; }

  .kmd-signup-btn {
    font-size: 0.875rem !important;
    font-weight: 600 !important;
    background: #f57c00 !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 0 20px !important;
    height: 36px !important;
    box-shadow: none !important;
    transition: background 0.2s !important;
  }

  .kmd-signup-btn:hover {
    background: #e65100 !important;
  }

  .kmd-mobile-link {
    font-size: 0.95rem;
    font-weight: 400;
    color: #374151;
    padding: 12px 4px;
    display: block;
    text-decoration: none !important;
    border-bottom: 1px solid #f3f4f6;
    transition: color 0.2s;
  }

  .kmd-mobile-link:hover,
  .kmd-mobile-link.active {
    color: #f57c00;
  }
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
export const AcmeLogo = () => (
  <RouterLink to="/" className="kmd-brand">
    <span className="kmd-brand-uni">Uni</span><span className="kmd-brand-mag">Magazine</span>
  </RouterLink>
);

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
    { name: "Terms", route: "/terms" },
  ];

  return (
    <>
      <style>{styles}</style>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="kmd-navbar sticky top-0 z-50"
        maxWidth="xl"
        height="60px"
      >
        {/* ── Mobile: Toggle + Logo ── */}
        <NavbarContent className="sm:hidden gap-2">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            icon={
              isMenuOpen
                ? <HiX size={20} style={{ color: "#374151" }} />
                : <HiMenu size={20} style={{ color: "#374151" }} />
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

        {/* ── Desktop: Nav links + Auth ── */}
        <NavbarContent className="hidden sm:flex items-center gap-6" justify="end">

          {menuItems.map((item) => (
            <NavbarItem key={item.route}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `kmd-nav-link${isActive ? " active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            </NavbarItem>
          ))}

          {/* Divider */}
          <div style={{ width: "1px", height: "18px", background: "#e5e7eb" }} />

          {user ? (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    name={user?.name}
                    src={profileImage}
                    color="warning"
                    isBordered
                    size="sm"
                    className="transition-transform"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-1" isReadOnly>
                    <p className="text-xs text-default-400">Signed in as</p>
                    <p className="text-sm font-medium text-default-700 truncate">
                      {user?.email}
                    </p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" onPress={redirectToDashboard}>
                    Dashboard
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem>
                <NavLink to="/login" className="kmd-login-btn">
                  Login
                </NavLink>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={NavLink}
                  to="/register"
                  className="kmd-signup-btn"
                  size="sm"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {/* ── Mobile Menu ── */}
        <NavbarMenu
          style={{
            background: "#ffffff",
            borderTop: "1px solid #f3f4f6",
            paddingTop: "16px",
            paddingBottom: "24px",
          }}
        >
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <NavbarMenuItem key={item.route}>
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    `kmd-mobile-link${isActive ? " active" : ""}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </NavbarMenuItem>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {user ? (
              <>
                <p className="text-xs text-default-400 mb-1">{user?.email}</p>
                <Button
                  fullWidth
                  variant="flat"
                  onPress={() => { redirectToDashboard(); setIsMenuOpen(false); }}
                  className="text-sm font-medium"
                >
                  Dashboard
                </Button>
                <Button
                  fullWidth
                  color="danger"
                  variant="flat"
                  onPress={handleLogout}
                  className="text-sm font-medium"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={NavLink}
                  to="/login"
                  fullWidth
                  variant="flat"
                  className="text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
                <Button
                  as={NavLink}
                  to="/register"
                  fullWidth
                  className="kmd-signup-btn"
                  onClick={() => setIsMenuOpen(false)}
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