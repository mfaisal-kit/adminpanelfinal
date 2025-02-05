"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [router]);

  // Handle login action
  const handleLogin = () => {
    // Fetch credentials from environment variables
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAuthenticated(true);
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } else {
      alert("Invalid credentials, please try again!");
    }
  };

  // Function to handle the toggle of the menu
  const toggleMenu = (menuId: number) => {
    if (activeMenu === menuId) {
      setActiveMenu(null); // Close if the same menu is clicked again
    } else {
      setActiveMenu(menuId); // Open the clicked menu
    }
  };

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isAuthenticated) {
    return (
      <main className="flex justify-center items-center h-screen bg-[#070b18]">
        <div className="w-full max-w-md space-y-4 text-white font-[sans-serif]">
          <h1 className="text-center text-3xl font-semibold mb-6">Admin Login</h1>

          <form className="w-full space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-gray-100 w-full text-sm text-black outline-[#333] rounded-sm transition-all"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 bg-gray-100 w-full text-sm text-black outline-[#333] rounded-sm transition-all"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="w-4" />
              <label className="text-sm ml-4 text-white">Remember me</label>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="!mt-8 px-6 py-2.5 text-sm bg-[#333] hover:bg-[#222] text-white rounded-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    );
  } else {
    router.push("/dashboard"); // Redirect to dashboard after successful login
  }

  return (
    <div className="relative bg-[#070b18] h-screen font-[sans-serif]">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-60" : "w-0"
          } bg-gray-800 text-white transition-all ease-in-out duration-300 min-h-screen overflow-hidden`}
        >
          <div className="p-4">
            <button onClick={toggleSidebar} className="text-white">
              Close Sidebar
            </button>
            <ul className="mt-8 space-y-4">
              <li>
                <button className="text-white" onClick={() => toggleMenu(1)}>
                  Menu 1
                </button>
                {activeMenu === 1 && <div className="ml-4">Submenu 1</div>}
              </li>
              <li>
                <button className="text-white" onClick={() => toggleMenu(2)}>
                  Menu 2
                </button>
                {activeMenu === 2 && <div className="ml-4">Submenu 2</div>}
              </li>
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <main
          className={`flex flex-col items-center justify-center ml-[270px] max-lg:ml-0 max-lg:w-full p-6 bg-[#070b18] min-h-screen w-full transition-all duration-300 ease-in-out ${
            sidebarOpen ? "max-lg:ml-[240px]" : "max-lg:ml-0"
          }`}
        >
          <h1 className="text-white text-3xl font-semibold mb-8">
            Welcome Admin Panel, Ibrahim Restuarant
          </h1>
          <p className="text-white">Admin content goes here...</p>
        </main>
      </div>
    </div>
  );
}
