import { Link, useLocation } from "wouter";
import { useMobileMenu } from "@/context/MobileMenuContext";

const navItems = [
  { path: "/", label: "Home", icon: "home" },
  { path: "/about", label: "About", icon: "info" },
  { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { path: "/settings", label: "Settings", icon: "settings" },
];

const MobileNav = () => {
  const [location] = useLocation();
  const { mobileMenuOpen, closeMobileMenu } = useMobileMenu();

  return (
    <div 
      className={`fixed inset-0 z-20 ${mobileMenuOpen ? 'block' : 'hidden'}`}
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={closeMobileMenu}
        aria-hidden="true"
      ></div>
      <div 
        className={`absolute top-0 left-0 w-64 h-full bg-white shadow-elevation-8 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-neutral-200 bg-primary text-white">
          <div className="flex items-center space-x-2">
            <span className="material-icons">code</span>
            <span className="font-medium">React TS App</span>
          </div>
        </div>
        <nav className="p-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              onClick={closeMobileMenu}
              className={`flex items-center space-x-2 px-4 py-3 rounded text-neutral-800 hover:bg-neutral-100 ${
                location === item.path ? "bg-neutral-100" : ""
              }`}
            >
              <span className="material-icons">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
