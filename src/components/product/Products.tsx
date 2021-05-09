import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  SidebarType,
  MainSidebarContext,
} from "../context/SidebarContextProvider";

const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true,
  },

  {
    name: "First Name",
    selector: "first_name",
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "last_name",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Avatar",
    selector: "avatar",
    sortable: false,
  },
];
const customStyles = {
  rows: {
    style: {
      minHeight: "35px",
    },
    stripedStyle: {
      backgroundColor: "#dbebdc",
    },
  },
  header: {
    style: {
      fontSize: "22px",
      minHeight: "56px",
      paddingLeft: "16px",
      paddingRight: "8px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#384538",
      minHeight: "42px",
      borderBottomWidth: "1px",
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "23px",
      fontWeight: 600,
      color: "#fff",
    },
    activeSortStyle: {
      color: "#fff",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "16px",
    },
  },
};

interface Product {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

type ProductList = Product[];

export const Products: FC = (Props) => {
  const [products, setProducts] = useState<ProductList>([]);
  const { sidebarOpened, sidebarWidth } = useContext<SidebarType>(
    MainSidebarContext
  );

  useEffect(() => {
    axios.get<ProductList>("http://8gll4.mocklab.io/json/1").then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });
  }, []);

  return (
    <div
      className="product-table"
      style={{ paddingLeft: sidebarOpened === true ? sidebarWidth : 0 }}
    >
      <Card>
        <DataTable
          columns={columns}
          data={products}
          defaultSortField="id"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
          customStyles={customStyles}
          striped={true}
          highlightOnHover={true}
        />
      </Card>
    </div>
  );
};
