import React, { createContext, useContext, useState, ReactNode } from "react";

interface MobileMenuContextType {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// Initialize with default values to avoid undefined errors
const defaultState: MobileMenuContextType = {
  mobileMenuOpen: false,
  toggleMobileMenu: () => {},
  openMobileMenu: () => {},
  closeMobileMenu: () => {},
};

const MobileMenuContext = createContext<MobileMenuContextType>(defaultState);

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const value = {
    mobileMenuOpen,
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = (): MobileMenuContextType => {
  const context = useContext(MobileMenuContext);
  return context;
};
