"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaTruck,
  FaUser,
  FaPlusCircle,
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import { Button, Drawer } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function DashboardSidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hydration Fix
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userNavLinks = [
    {
      icon: FaTachometerAlt,
      href: "/dashboard/user",
      label: "Dashboard",
    },
    {
      icon: FaTruck,
      href: "/dashboard/user/deliveries",
      label: "Delivery History",
    },
    {
      icon: FaBook,
      href: "/dashboard/user/reading-list",
      label: "My Reading List",
    },
    {
      icon: FaStar,
      href: "/dashboard/user/reviews",
      label: "My Reviews",
    },
    {
      icon: FaUser,
      href: "/dashboard/user/profile",
      label: "Profile",
    },
  ];

  const librarianNavLinks = [
    {
      icon: FaTachometerAlt,
      href: "/dashboard/librarian",
      label: "Dashboard",
    },
    {
      icon: FaPlusCircle,
      href: "/dashboard/librarian/add-book",
      label: "Add Book",
    },
    {
      icon: FaClipboardList,
      href: "/dashboard/librarian/inventory",
      label: "Manage Inventory",
    },
    {
      icon: FaTruck,
      href: "/dashboard/librarian/deliveries",
      label: "Manage Deliveries",
    },
    {
      icon: FaUser,
      href: "/dashboard/librarian/profile",
      label: "Profile",
    },
  ];

  const adminNavLinks = [
    {
      icon: FaTachometerAlt,
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    {
      icon: FaCheckCircle,
      href: "/dashboard/admin/book-approvals",
      label: "Book Approval Queue",
    },
    {
      icon: FaUsers,
      href: "/dashboard/admin/users",
      label: "Manage Users",
    },
    {
      icon: FaBook,
      href: "/dashboard/admin/books",
      label: "Manage All Books",
    },
    {
      icon: FaMoneyBillWave,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
    {
      icon: FaUser,
      href: "/dashboard/admin/profile",
      label: "Profile",
    },
  ];

  const navLinks = {
    user: userNavLinks,
    librarian: librarianNavLinks,
    admin: adminNavLinks,
  };

  // Hydration mismatch prevent
  const navItems = mounted
    ? navLinks[user?.role] || userNavLinks
    : [];

  const navContent = (
    <ul className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-orange-500/10 text-orange-600 font-semibold border-l-4 border-orange-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon
                size={18}
                className={isActive ? "text-orange-500" : "text-gray-500"}
              />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  if (!mounted) {
    return (
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 p-4 min-h-[calc(100vh-64px)] sticky top-16">
        <div className="mb-6 px-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </h2>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 p-4 min-h-[calc(100vh-64px)] sticky top-16">
        <div className="mb-6 px-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider">
            {user?.role || "User"} Menu
          </h2>
        </div>

        {navContent}
      </aside>

      {/* Mobile Floating Menu Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          isIconOnly
          radius="full"
          className="bg-orange-500 text-white shadow-lg"
          onPress={() => setOpen(true)}
        >
          <FiMenu size={22} />
        </Button>
      </div>

      {/* Mobile Drawer */}
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-xl font-bold">
                  Knowledge
                  <span className="text-orange-500">Hub</span>
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}