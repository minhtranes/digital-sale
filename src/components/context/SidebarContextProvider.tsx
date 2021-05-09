import { createContext, useState } from "react";

export type SidebarType = {
  sidebarOpened: boolean;
  sidebarWidth: number;
  updateSidebar: (isOpened: boolean) => void;
  updateSidebarWidth: (size: number) => void;
};

export const MainSidebarContext = createContext<SidebarType>({
  sidebarOpened: true,
  sidebarWidth: 220,
  updateSidebar: (isOpened: boolean) => {},
  updateSidebarWidth: (size: number) => {},
});

const SidebarContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [sidebarOpened, setSidebarStatus] = useState<boolean>(true);
  const [sidebarWidth, setSidebarWidth] = useState<number>(220);

  const updateSidebar = (isOpened: boolean) => {
    setSidebarStatus(isOpened);
  };
  const updateSidebarWidth = (size: number) => {
    setSidebarWidth(size);
  };

  return (
    <MainSidebarContext.Provider
      value={{ sidebarOpened, sidebarWidth, updateSidebar, updateSidebarWidth }}
    >
      {children}
    </MainSidebarContext.Provider>
  );
};

export default SidebarContextProvider;
