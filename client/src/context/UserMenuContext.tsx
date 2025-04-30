import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserMenuContextType {
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
  openUserMenu: () => void;
  closeUserMenu: () => void;
}

// Initialize with default values to avoid undefined errors
const defaultState: UserMenuContextType = {
  userMenuOpen: false,
  toggleUserMenu: () => {},
  openUserMenu: () => {},
  closeUserMenu: () => {},
};

const UserMenuContext = createContext<UserMenuContextType>(defaultState);

export const UserMenuProvider = ({ children }: { children: ReactNode }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const openUserMenu = () => {
    setUserMenuOpen(true);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('[aria-haspopup="true"]')) {
          closeUserMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const value = {
    userMenuOpen,
    toggleUserMenu,
    openUserMenu,
    closeUserMenu,
  };

  return (
    <UserMenuContext.Provider value={value}>
      {children}
    </UserMenuContext.Provider>
  );
};

export const useUserMenu = (): UserMenuContextType => {
  const context = useContext(UserMenuContext);
  return context;
};
