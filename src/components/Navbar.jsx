"use client";
import { useState } from "react";
import { Button, Separator, Spinner } from "@heroui/react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import { ThemeSwitch } from "./ThemeSwitch";
import { authClient } from "@/lib/auth-client";
import { FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const baseNavItems = [
    { label: "Home", href: "/", isActive: true },
    { label: "Browse", href: "/browse?page=1", isActive: false },
  ];

  const dashboardLinks = {
    user: "/dashboard/user",
    librarian: "/dashboard/librarian",
    admin: "/dashboard/admin",
  };

  const navItems = user?.email
    ? [
        ...baseNavItems,
        {
          label: "Dashboard",
          href: dashboardLinks[user.role],
        },
      ]
    : baseNavItems;

  const [activeItem, setActiveItem] = useState(
    navItems.find((item) => item.isActive)?.label || navItems[0].label,
  );

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/70 backdrop-blur-md">
      <header className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo Section */}
        <Link href={"/"}>
          
          <p className="font-bold text-2xl tracking-tight text-foreground">
            Knowledge<span className="text-orange-500">Hub</span>
          </p>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="flex items-center gap-4 md:flex-1 md:justify-end md:gap-6">
          <ThemeSwitch />

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex bg-default-100/80 p-1.5 px-2 rounded-full border border-default-200/50">
            {navItems.map((item, index) => {
              const isCurrentActive = activeItem === item.label;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 block ${
                      isCurrentActive
                        ? "bg-orange-500 text-white shadow-sm font-semibold"
                        : "text-default-600 hover:text-orange-500"
                    }`}
                    aria-current={isCurrentActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Separator orientation="vertical" className="hidden md:block h-6 bg-default-200" />

          {/* User Auth Buttons (Desktop) */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-orange-600 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 font-bold text-sm overflow-hidden shadow-sm">
                  {isPending ? (
                    <Spinner size="sm" color="warning" />
                  ) : user?.image ? (
                    <Image
                      src={user.image}
                      width={36}
                      height={36}
                      alt="avatar"
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <span>
                      {user?.name?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 transition-colors rounded-full py-2 text-white px-4 text-sm font-medium flex justify-center items-center gap-2 shadow-sm"
                >
                  Logout <FaArrowRight size={12} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-default-600 hover:text-orange-500 transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-orange-500 hover:bg-orange-600 transition-colors rounded-full py-2 text-white px-4 text-sm font-medium shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-default-100 text-default-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <CiMenuBurger size={22} className="stroke-2" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-default-100 md:hidden bg-background/95 backdrop-blur-md absolute top-16 left-0 w-full shadow-lg transition-all duration-300">
          <ul className="flex flex-col gap-1 p-4">
            {navItems.map((item, index) => {
              const isCurrentActive = activeItem === item.label;
              return (
                <li key={index} className="w-full">
                  <Link
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.label);
                      setIsMenuOpen(false);
                    }}
                    className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                      isCurrentActive 
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-950/20 font-bold" 
                        : "text-default-600 hover:bg-default-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* User Auth Buttons (Mobile) */}
            <li className="mt-2 pt-4 border-t border-default-100 px-2">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-orange-600 bg-orange-50 dark:bg-orange-950/30 font-bold text-sm border border-orange-100 dark:border-orange-900">
                      {user?.image ? (
                        <Image src={user.image} width={36} height={36} alt="avatar" className="rounded-full object-cover" />
                      ) : (
                        <span>{user?.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                      <p className="text-xs text-default-400 line-clamp-1">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-2.5 text-sm font-medium shadow-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 text-center text-sm font-medium text-default-600 hover:bg-default-50 rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-center rounded-full py-2.5 text-sm font-medium shadow-sm transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}