import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import "./Sidebar.css";

type SidebarLinkProps = {
  item: SidebarItem;
};

const Submenu: FC<SidebarLinkProps> = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link className="sidebar-link" to={item.path} onClick={showSubnav}>
        <div>
          {item.icon}
          <span className="sidebar-label">{item.title}</span>
        </div>
        <div>
          {item?.subnav && subnav ? item?.iconOpened : item?.iconClosed}
        </div>
      </Link>
      {subnav &&
        item?.subnav?.map((subnavItem, index) => {
          return (
            <Link className="dropdown-link" to={subnavItem.path} key={index}>
              {subnavItem.icon}
              <span className="sidebar-sub-label">{subnavItem.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default Submenu;
