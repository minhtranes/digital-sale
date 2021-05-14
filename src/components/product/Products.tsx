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
import "./Products.css";
import { Popup } from "reactjs-popup";
import "./form.css";

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
  const closeModal = () => {
    setOpen(false);
    console.log("Name " + addingProduct.name);
  };

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
    setAddingProduct({
      ...addingProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div
      className="product-table"
      style={{ paddingLeft: sidebarOpened === true ? sidebarWidth : 0 }}
    >
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <div className="header">Import Product</div>
          <form className="content">
            <div style={{ display: "inline-block" }}>
              <div className="field">
                <label>Id</label>
                <input
                  type="text"
                  value={addingProduct.id}
                  name="id"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Id (Text)</label>
                <input
                  type="text"
                  value={addingProduct.idString}
                  name="idString"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  value={addingProduct.name}
                  name="name"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Import Price</label>
                <input
                  type="text"
                  value={addingProduct.importPrice}
                  name="importPrice"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Sale Price</label>
                <input
                  type="text"
                  value={addingProduct.salePrice}
                  name="salePrice"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Import Date</label>
                <input
                  type="text"
                  value={addingProduct.importDate}
                  name="importDate"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Expiration Date</label>
                <input
                  type="text"
                  value={addingProduct.expirationDate}
                  name="expirationDate"
                  onChange={onValueChange}
                />
              </div>
            </div>
            <div style={{ display: "inline-block" }}>
              <div className="field">
                <label>Retail Department</label>
                <input
                  type="text"
                  value={addingProduct.retailDepartment}
                  name="retailDepartment"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>City</label>
                <input
                  type="text"
                  value={addingProduct.city}
                  name="city"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={addingProduct.phoneNumber}
                  name="phoneNumber"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Currency</label>
                <input
                  type="text"
                  value={addingProduct.currency}
                  name="currency"
                  onChange={onValueChange}
                />
              </div>
              <div className="field">
                <label>Business Address</label>
                <input
                  type="text"
                  value={addingProduct.businessAddress}
                  name="businessAddress"
                  onChange={onValueChange}
                  style={{ width: "500px" }}
                />
              </div>

              <div className="field">
                <label>Shipping Address</label>
                <input
                  type="text"
                  value={addingProduct.shippingAddress}
                  name="shippingAddress"
                  onChange={onValueChange}
                  style={{ width: "500px" }}
                />
              </div>
            </div>
          </form>
          <div className="actions">
            <button
              className="btn"
              onClick={closeModal}
              style={{ marginRight: "2px" }}
            >
              Cancel
            </button>
            <button className="btn" type="submit" style={{ marginLeft: "2px" }}>
              Save
            </button>
          </div>
        </div>
      </Popup>

      <div className="actionbar">
        <button className="btn" onClick={() => setOpen((o) => !o)}>
          Add Product
        </button>
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
