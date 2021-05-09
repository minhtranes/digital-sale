import { createContext, useState } from "react";

export type SidebarType = {
  sidebarOpened: boolean;
  updateSidebar: (isOpened: boolean) => void;
};

export const MainSidebarContext = createContext<SidebarType>({
  sidebarOpened: true,
  updateSidebar: (isOpened: boolean) => {},
});

const SidebarContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [sidebarOpened, setSidebarStatus] = useState<boolean>(true);

  const updateSidebar = (isOpened: boolean) => {
    console.info("Side status changed to: " + isOpened);
    setSidebarStatus(isOpened);
  };

  return (
    <MainSidebarContext.Provider value={{ sidebarOpened, updateSidebar }}>
      {children}
    </MainSidebarContext.Provider>
  );
};

export default SidebarContextProvider;
