import React, { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";
import Navbar from "../navbar/Navbar";
import {
  MainSidebarContext,
  SidebarType,
} from "../context/SidebarContextProvider";

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const [sidebarOpened, setSidebar] = useState(false);
  const showSidebar = () => {
    updateSidebar(!sidebarOpened);
    setSidebar(!sidebarOpened);
  };
  const { updateSidebar } = useContext<SidebarType>(MainSidebarContext);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="navbar">
        <Link className="navbar-icon" to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </Link>
        <Navbar />
      </div>
      <div
        className="sidebar"
        style={{ left: sidebarOpened === true ? "-100%" : "0%" }}
      >
        <SidebarWrap>
          <div className="sidebar-logo">Digital Saler</div>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
