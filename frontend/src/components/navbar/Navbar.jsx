import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import applogo from "../../assets/applogo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("tokenUser");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenUser");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:8000/delete-user/${user}`, {
        method: "DELETE",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("tokenUser");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  // Reusable class for links
  const linkClass =
    "block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300";

  return (
    <div className="rounded-b-2xl bg-gradient-to-b from-gray-900 to-gray-800 w-full z-50 shadow-lg h-20">
      <header className="relative inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Serene Sphere</span>
              <img className="h-8 w-auto" src={applogo} alt="Serene Sphere" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            <a href={`/${user}/mood`} className={linkClass}>
              Mood Tracker
            </a>
            <a href={`/${user}/therapist`} className={linkClass}>
              AI Therapist
            </a>
            <a href={`/${user}/quiz`} className={linkClass}>
              Quiz
            </a>
            <a href={`/${user}/anonymoussharing`} className={linkClass}>
              Anonymous Sharing
            </a>
            <a href="/aboutus" className={linkClass}>
              About Us
            </a>
          </div>

          {/* Profile Picture and Dropdown */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716336000&semt=ais_user"
                    alt="Profile"
                  />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition duration-300 transform scale-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href={`/${user}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      onClick={(e) => handleLogout(e)}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                    <a
                      onClick={handleDelete}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Delete Profile
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className={linkClass}>
                Login <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-75 transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm transition-transform duration-300 transform translate-x-0">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Serene Sphere</span>
                  <img
                    className="h-8 w-auto"
                    src={applogo}
                    alt="Serene Sphere"
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a href={`/${user}/mood`} className={linkClass}>
                      Mood Tracker
                    </a>
                    <a href={`/${user}/therapist`} className={linkClass}>
                      AI Therapist
                    </a>
                    <a href={`/${user}/quiz`} className={linkClass}>
                      Quiz
                    </a>
                    <a href={`/${user}/anonymoussharing`} className={linkClass}>
                      Anonymous Sharing
                    </a>
                    <a href="/aboutus" className={linkClass}>
                      About Us
                    </a>
                  </div>
                  <div className="py-6">
                    {isLoggedIn ? (
                      <a
                        href="#"
                        onClick={(e) => handleLogout(e)}
                        className={linkClass}
                      >
                        Logout
                      </a>
                    ) : (
                      <a href="/login" className={linkClass}>
                        Login
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
