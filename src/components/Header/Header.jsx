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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";

export const AcmeLogo = () => (
  <svg
    fill="none"
    height="36"
    viewBox="0 0 32 32"
    width="36"
    className="text-primary"
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();

  const { user } = useAuth();
  const { mutate: logout } = useLogout()

  const handleLogout = () => {
    logout();
  }

  const navigate = useNavigate()

  const redirectToDashboard = () => {
    if (user?.role?.name === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role?.name === "student") {
      navigate("/student/dashboard");
    } else if (user?.role?.name === "marketing_coordinator") {
      navigate("/marketing-coordinator/dashboard");
    } else if (user?.role?.name === "marketing_manager") {
      navigate("/marketing-manager/dashboard");
    }
  }
 
  const menuItems = [
    { name: "Home", route: "/" },
    { name: "Articles", route: "/articles" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/70 backdrop-blur-md sticky top-0 z-50"
    >
      {/* Mobile Toggle & Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to="/" className="flex items-center gap-1">
            <AcmeLogo />
            <p className="font-bold text-inherit tracking-tight">KMD</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.route} isActive={pathname === item.route}>
            <Link
              as={NavLink}
              to={item.route}
              color={pathname === item.route ? "primary" : "foreground"}
              className="text-sm font-medium transition-opacity hover:opacity-70"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Auth Actions */}
      {user ? (
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.name}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard" color="primary" onClick={redirectToDashboard}>
                Dashboard
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link
              as={NavLink}
              to="/login"
              color="foreground"
              className="text-sm"
            >
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={NavLink}
              to="/register"
              color="primary"
              variant="flat"
              radius="full"
              className="font-semibold"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.route}>
            <Link
              as={NavLink}
              to={item.route}
              className="w-full py-2 text-lg"
              color={pathname === item.route ? "primary" : "foreground"}
              onPress={() => setIsMenuOpen(false)} // Auto-close menu on click
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
