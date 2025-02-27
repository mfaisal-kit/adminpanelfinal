"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarMenu from "../admincomponents/SidebarMenu";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsAuthenticated(true); // User is authenticated
    } else {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [router]);


  if (!isAuthenticated) {
    return null; // Prevent rendering of the dashboard if not authenticated
  }

  return (
    <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Content Area */}
        <main
          className="ml-[270px] max-lg:ml-0 max-lg:w-full p-6 bg-[#070b18] min-h-screen w-full ${
              max-lg:ml-[240px] max-lg:ml-0"
          
        >
         
          <div className="grid grid-cols-3 gap-6 mt-6">
            

          </div>
        </main>
      </div>
    </div>
  );
}
