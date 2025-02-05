"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SidebarMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for toggling sidebar
  const router = useRouter();

  // Toggle sidebar visibility for mobile screens


  // Handle Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn"); // Remove the login status from localStorage
    router.push("/"); // Redirect to login page after logout
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-screen bg-[#081028] transition-all duration-500 ease-in-out z-50 ${
        sidebarOpen ? "w-64" : "w-0"
      } lg:w-64`}
    >
      <div className="bg-[#081028] flex items-center gap-4 pt-6 pb-2 px-4 sticky top-0 min-h-[64px]">
        {/* Sidebar logo or header */}
        <a href="/dashboard" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" className="w-8 h-8">
            {/* SVG for logo */}
            <path fill="#017bfe" d="M70.5 84.5c..."></path>
            <path fill="#ffffff" d="M71.5 81.5c..."></path>
          </svg>
          <p className="text-base font-semibold text-gray-300 tracking-wide">Dashboard</p>
        </a>

        {/* Mobile toggle button */}
        
      </div>

      {/* Sidebar links */}
      <div className="py-4 px-4">
        <ul className="space-y-2 mt-6">
          <li>
            <a
              href="/dashboard"
              className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/product"
              className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
            >
              Product
            </a>
          </li>
          {/* Add Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
