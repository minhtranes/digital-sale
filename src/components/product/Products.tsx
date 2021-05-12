import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  SidebarType,
  MainSidebarContext,
} from "../context/SidebarContextProvider";
import "../navbar/Button.css";
import { Link } from "react-router-dom";
import "./Products.css";
import { Popup } from "reactjs-popup";
import { type } from "node:os";
import "./AddProductForm.css";

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
  baseURL: "https://digital-saler-inventory.herokuapp.com/inventory",
  headers: { "Content-Type": "application/json" },
});

export const Products: FC = (Props) => {
  const [products, setProducts] = useState<ProductList>({
    content: [],
    totalElements: 0,
  });
  const { sidebarOpened, sidebarWidth } =
    useContext<SidebarType>(MainSidebarContext);

  const [paginationPerPage, setPaginationPerPage] = useState<number>(20);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    inventoryRepository.get<ProductList>("/list").then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });
    setLoading(false);
  }, []);

  const handlePageChange = (page: number) => {
    setLoading(true);

    console.log("Page change to " + page);
    inventoryRepository.get<ProductList>(`/list?page={page}`).then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });

    setLoading(false);
  };

  const editProduct = (product: Product) => {
    console.log("Product selected" + product.id);
  };

  const addProductFc = () => {
    console.log("Mouse clicked!!");
    return (
      <Popup position="right center">
        <div>Popup content here !!</div>
      </Popup>
    );
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div
      className="product-table"
      style={{ paddingLeft: sidebarOpened === true ? sidebarWidth : 0 }}
    >
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <AddingProductView />
        </div>
      </Popup>

      <div className="actionbar">
        <button className="btn" onClick={() => setOpen((o) => !o)}>
          Add Product
        </button>
        {/* <Link to="" style={{ right: "20px" }} onClick={addProductFc}>
          <button className="btn">Add Product</button>
        </Link> */}
      </div>

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
          progressPending={loading}
          paginationPerPage={paginationPerPage}
          onRowDoubleClicked={editProduct}
        />
      </Card>
    </div>
  );
};

type AddingProduct = {
  id: number;
  idString: string;
  name: string;
  retailDepartment: string;
  city: string;
  phoneNumber: string;
  currency: string;
  businessAddress: string;
  importPrice: number;
  salePrice: number;
  shippingAddress: string;
  importDate: string;
  expirationDate: string;
  expired: boolean;
};

const AddingProductView: FC = (props) => {
  const [addingProduct, setAddingProduct] = useState<AddingProduct>({
    id: 0,
    idString: "",
    name: "",
    retailDepartment: "",
    city: "",
    phoneNumber: "",
    currency: "",
    businessAddress: "",
    importPrice: 0,
    salePrice: 0,
    shippingAddress: "",
    importDate: "",
    expirationDate: "",
    expired: false,
  });

  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    // console.log(
    //   "Editing field " +
    //     e.currentTarget.name +
    //     " with value " +
    //     e.currentTarget.value
    // );
    setAddingProduct({
      ...addingProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="product-add">
      <div className="product-add-header">Sample header</div>
      <div>
        <div className="product-add-field">
          <label className="product-add-label">Name</label>
          <input
            type="text"
            value={addingProduct.name}
            name="name"
            onChange={onValueChange}
          />
        </div>
      </div>
    </div>
  );
};
