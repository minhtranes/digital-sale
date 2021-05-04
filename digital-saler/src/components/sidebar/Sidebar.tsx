import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";
import Navbar from "../navbar/Navbar";

const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
        style={{ left: sidebar === true ? "0%" : "-100%" }}
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
