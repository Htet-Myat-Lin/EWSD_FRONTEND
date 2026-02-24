import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";

// Icons (using react-icons/lu for Lucide, you can use any)
import { LuLogOut, LuMenu } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";

// ----------------------------------------------------------------------
// 1. Sidebar Component (Reused for Desktop & Mobile)
// ----------------------------------------------------------------------
const SidebarContent = ({ menuItems }) => {
  const location = useLocation();
  const { mutate: logout } = useLogout()

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header / Logo */}
      <div className="flex items-center justify-center h-16 border-b border-divider">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
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
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems?.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-default-500 hover:bg-default-100 hover:text-default-900"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-divider">
        <Button
          variant="light"
          color="danger"
          startContent={<LuLogOut size={20} />}
          fullWidth
          className="justify-start"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. Main Layout Component
// ----------------------------------------------------------------------
export function DashboardLayout({ menuItems }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth()

  return (
    <div className="flex h-screen w-full bg-default-50">
      {/* --- Desktop Sidebar (Hidden on mobile) --- */}
      <aside className="hidden md:flex w-64 flex-col border-r border-divider bg-gray-100 fixed h-full z-50">
        <SidebarContent menuItems={menuItems} />
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Top Navbar */}
        <Navbar
          isBordered
          className="bg-gray-100/70 backdrop-blur-md sticky top-0 z-40 w-full h-16"
          maxWidth="full"
        >
          {/* Mobile Menu Toggle */}
          <NavbarContent className="md:hidden" justify="start">
            <Button isIconOnly variant="light" onPress={onOpen}>
              <LuMenu size={24} />
            </Button>
          </NavbarContent>

          {/* Brand (Visible on Mobile only usually) */}
          <NavbarContent className="md:hidden pr-3" justify="center">
            <NavbarBrand>
              <p className="font-bold text-inherit">KMD</p>
            </NavbarBrand>
          </NavbarContent>

          {/* Right Side: User Menu */}
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
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>

        {/* Page Content (Outlet) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* --- Mobile Sidebar (Drawer) --- */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent>
          {() => (
            <>
              <DrawerBody className="p-0">
                <SidebarContent menuItems={menuItems} />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
