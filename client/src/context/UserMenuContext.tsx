import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserMenuContextType {
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
  openUserMenu: () => void;
  closeUserMenu: () => void;
}

const UserMenuContext = createContext<UserMenuContextType | undefined>(undefined);

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

  return (
    <UserMenuContext.Provider
      value={{
        userMenuOpen,
        toggleUserMenu,
        openUserMenu,
        closeUserMenu,
      }}
    >
      {children}
    </UserMenuContext.Provider>
  );
};

export const useUserMenu = (): UserMenuContextType => {
  const context = useContext(UserMenuContext);
  if (context === undefined) {
    throw new Error("useUserMenu must be used within a UserMenuProvider");
  }
  return context;
};
