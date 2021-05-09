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
    name: "IdS",
    selector: "idString",
    sortable: true,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Retail Department",
    selector: "retailDepartment",
    sortable: true,
  },
  {
    name: "City",
    selector: "city",
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: "phoneNumber",
    sortable: false,
  },
  {
    name: "Currency",
    selector: "currency",
    sortable: false,
  },
  {
    name: "Business Address",
    selector: "curbusinessAddressrency",
    sortable: false,
  },
  {
    name: "Import Price",
    selector: "importPrice",
    sortable: false,
  },
  {
    name: "Sale Price",
    selector: "salePrice",
    sortable: false,
  },
  {
    name: "Shipping Address",
    selector: "shippingAddress",
    sortable: false,
  },
  {
    name: "Import Date",
    selector: "importDate",
    sortable: false,
  },
  {
    name: "Expiration Date",
    selector: "expirationDate",
    sortable: false,
  },
  {
    name: "Expired",
    selector: "expired",
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
      minHeight: "1px",
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
      fontSize: "20px",
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
  idString: string;
  name: string;
  retailDepartment: string;
  city: number;
  phoneNumber: string;
  currency: string;
  businessAddress: string;
  importPrice: number;
  salePrice: number;
  shippingAddress: string;
  importDate: string;
  expirationDate: string;
  expired: boolean;
}

type ProductList = { content: Product[]; totalElements: number };

const inventoryRepository = axios.create({
  baseURL: "http://localhost:8080/inventory",
  headers: { "Content-Type": "application/json" },
});

export const Products: FC = (Props) => {
  const [products, setProducts] = useState<ProductList>({
    content: [],
    totalElements: 0,
  });
  const { sidebarOpened, sidebarWidth } = useContext<SidebarType>(
    MainSidebarContext
  );

  useEffect(() => {
    inventoryRepository.get<ProductList>("/list").then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });
  }, []);

  const handlePageChange = (page: number) => {
    console.log("Page change to " + page);
    inventoryRepository.get<ProductList>(`/list?page={page}`).then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });
  };

  return (
    <div
      className="product-table"
      style={{ paddingLeft: sidebarOpened === true ? sidebarWidth : 0 }}
    >
      <Card>
        <DataTable
          columns={columns}
          data={products.content}
          defaultSortField="id"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
          customStyles={customStyles}
          striped={true}
          // paginationServer
          paginationTotalRows={products.totalElements}
          highlightOnHover={true}
          onChangePage={handlePageChange}
        />
      </Card>
    </div>
  );
};
