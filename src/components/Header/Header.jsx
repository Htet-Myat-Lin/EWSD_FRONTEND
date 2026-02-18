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
  Chip,
  Divider,
} from "@heroui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { 
  HiHome,
  HiDocumentText,
  HiInformationCircle,
  HiPhone,
  HiMenu,
} from "react-icons/hi";

export const AcmeLogo = () => (
  <div className="flex items-center">
    <div className="relative">
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
    </div>
    <div className="flex flex-col">
      <p className="font-bold text-inherit text-lg tracking-tight">KMD</p>
      <p className="text-xs text-default-500">University Magazine</p>
    </div>
  </div>
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
    { name: "Home", route: "/", icon: HiHome },
    { name: "Articles", route: "/articles", icon: HiDocumentText },
    { name: "About", route: "/about", icon: HiInformationCircle },
    { name: "Contact", route: "/contact", icon: HiPhone },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/80 backdrop-blur-lg border-b border-default-200 sticky top-0 z-50 shadow-sm"
      maxWidth="xl"
    >
      {/* Mobile Toggle & Logo */}
      <NavbarContent className="sm:hidden -space-x-3">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="data-open:rotate-180 transition-transform duration-300"
          icon={<HiMenu size={20} />}
        />
        <NavbarBrand>
          <NavLink to="/" className="flex items-center">
            <AcmeLogo />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Logo */}
      <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <NavLink to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <AcmeLogo />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.route;
          return (
            <NavbarItem key={item.route} isActive={isActive}>
              <Link
                as={NavLink}
                to={item.route}
                color={isActive ? "primary" : "foreground"}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1 px-3 py-2 rounded-lg ${
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "hover:bg-default-100/50"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
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
      <NavbarMenu className="pt-8 pb-4">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.route;
            return (
              <NavbarMenuItem key={item.route}>
                <Link
                  as={NavLink}
                  to={item.route}
                  className={`w-full py-3 px-4 text-lg font-medium transition-colors duration-200 flex items-center gap-3 rounded-lg ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground hover:bg-default-100"
                  }`}
                  color={isActive ? "primary" : "foreground"}
                  onPress={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
