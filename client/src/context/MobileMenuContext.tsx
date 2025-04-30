import React, { createContext, useContext, useState, ReactNode } from "react";

interface MobileMenuContextType {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

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

  return (
    <MobileMenuContext.Provider
      value={{
        mobileMenuOpen,
        toggleMobileMenu,
        openMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = (): MobileMenuContextType => {
  const context = useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }
  return context;
};
