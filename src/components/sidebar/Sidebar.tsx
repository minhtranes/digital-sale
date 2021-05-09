import React, { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";
import Navbar from "../navbar/Navbar";
import { SidebarContext, SidebarType } from "../context/SidebarContextProvider";

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const [sidebarOpened, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebarOpened);
    updateSidebar(!sidebarOpened);
  };
  const { updateSidebar } = useContext<SidebarType>(SidebarContext);

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
          <Link to="#" onClick={showSidebar} className="navbar-icon">
            <AiOutlineClose />
          </Link>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
