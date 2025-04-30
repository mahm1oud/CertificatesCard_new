import { Link, useLocation } from "wouter";
import { useMobileMenu } from "@/context/MobileMenuContext";
import { useUserMenu } from "@/context/UserMenuContext";

const navItems = [
  { path: "/", label: "Home", icon: "home" },
  { path: "/about", label: "About", icon: "info" },
  { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { path: "/settings", label: "Settings", icon: "settings" },
];

const Header = () => {
  const [location] = useLocation();
  const { toggleMobileMenu } = useMobileMenu();
  const { userMenuOpen, toggleUserMenu } = useUserMenu();

  return (
    <header className="bg-primary shadow-elevation-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              <span className="material-icons">menu</span>
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <span className="material-icons">code</span>
              <span className="font-medium text-lg">React TS App</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`px-3 py-2 rounded text-white hover:bg-primary-dark transition-all flex items-center ${
                  location === item.path ? "bg-primary-dark" : ""
                }`}
              >
                <span className="material-icons mr-1 text-sm">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center">
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-1 px-3 py-2 rounded text-white hover:bg-primary-dark"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <span className="material-icons">account_circle</span>
                <span className="hidden md:inline">User</span>
              </button>
              
              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-elevation-2 py-1 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100">
                    Your Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100">
                    Settings
                  </Link>
                  <div className="border-t border-neutral-200"></div>
                  <button className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
