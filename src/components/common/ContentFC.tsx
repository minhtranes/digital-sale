import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  SidebarType,
  MainSidebarContext,
} from "../context/SidebarContextProvider";

export const ContentFC: FC = (Props) => {
  const { sidebarOpened, sidebarWidth } = useContext<SidebarType>(
    MainSidebarContext
  );

  return (
    <div style={{ paddingLeft: sidebarOpened === true ? sidebarWidth : 0 }}>
      Users
    </div>
  );
};
