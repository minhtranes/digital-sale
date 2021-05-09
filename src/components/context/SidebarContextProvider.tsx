import { createContext, useState } from "react";

export type SidebarType = {
  sidebarOpened: boolean;
  updateSidebar: (isOpened: boolean) => void;
};

export const SidebarContext = createContext<SidebarType>({
  sidebarOpened: true,
  updateSidebar: (isOpened: boolean) => {},
});

const SidebarContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [sidebarOpened, setSidebarStatus] = useState<boolean>(true);

  const updateSidebar = (isOpened: boolean) => {
    setSidebarStatus(isOpened);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpened, updateSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
