import SortIcon from "@material-ui/icons/ArrowDownward";
import { FC, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import "../navbar/Button.css";
import "./Products.css";
import "./form.css";
import { actionCreators, productListActionCreators } from "../../state";
import ProductDetail from "./product.detail";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { listAll } from "../../services/product.service";
import { Product, emptyProduct } from "./product";
import { RootState } from "../../state/reducers";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const customStyles = {
  rows: {
    style: {
      minHeight: "5px",
    },
    stripedStyle: {
      backgroundColor: "#dbebdc",
    },
  },
  header: {
    style: {
      fontSize: "16px",
      minHeight: "1px",
      paddingLeft: "2px",
      paddingRight: "2px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#384538",
      minHeight: "1px",
      borderBottomWidth: "1px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
    denseStyle: {
      minHeight: "5px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "1px",
      paddingRight: "1px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#fff",
    },
    activeSortStyle: {
      color: "#fff",
    },
  },
  cells: {
    style: {
      paddingLeft: "1px",
      paddingRight: "1px",
      fontSize: "16px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
  },
};

const bgLoadSize = 1000;
const paginationRowsPerPageOptions = [10, 15, 20, 50, 100];

const Products: FC = (Props) => {
  const editingProduct = useSelector((state: RootState) => {
    return state.editingProduct.product;
  });

  // const [selectedProducts, setSelectedProducts] = useState<Product[]>([
  //   emptyProduct,
  // ]);

  // const handleSelectedChange = (s: {
  //   allSelected: boolean;
  //   selectedCount: number;
  //   selectedRows: Product[];
  // }) => {
  //   console.info("handleSelectedChange");
  //   setSelectedProducts(s.selectedRows);
  // };

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productList.products.length > 0) {
      return;
    }
    setLoading(true);

    listAll(0, bgLoadSize).then((r) => {
      console.info(r.data);
      loadComplete(r.data.content, r.data.totalElements);
      setLoading(false);
    }).catch(error => { });

  }, []);

  const [isBgLoading, setBgLoading] = useState(false);
  const backgroundLoad = () => {

    if (isBgLoading) {
      console.info("The background loading is working");
      return;
    }
    var loadedElements = productList.products.length;
    var totalElements = productList.totalElements;
    console.info(
      "Background loading check: loadedElements=%s, totalElements=%s",
      loadedElements,
      totalElements
    );
    if (loadedElements >= totalElements) {
      console.info("All product were loaded");
      setBgLoading(false);
      return;
    }

    setBgLoading(true);
    var page = productList.products.length / bgLoadSize;
    listAll(page, bgLoadSize).then((r) => {
      console.info(r.data);
      loadComplete(r.data.content, r.data.totalElements);

      setBgLoading(false);
    }).catch(error => { });
  };

  const productList = useSelector((state: RootState) => {
    console.info(
      "Product list totalElements = [%s]",
      state.productList.totalElements
    );

    return state.productList;
  });

  const pageChange = (page: number, totalRows: number) => {
    console.log("Page: [%s], totalRows: [%s]", page, totalRows);
    backgroundLoad();
    //     if(page*rowsPerPage<totalRows){
    // setLoading(true);

    //     listAll(page).then((r) => {
    //       console.info(r.data);
    //       loadComplete(r.data.content, r.data.totalElements);
    //       setLoading(false);
    //     });
    //     }
  };

  const dispatch = useDispatch();
  const { updateProducts, removeProducts, loadComplete } = bindActionCreators(
    productListActionCreators,
    dispatch
  );

  const { saveEditProduct, editProduct, abortEditProduct, beginEditProduct } =
    bindActionCreators(actionCreators, dispatch);

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
      width: "48px",
    },
    // {
    //   name: "IdS",
    //   selector: "idString",
    //   sortable: true,
    // },
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
    // {
    //   name: "Phone Number",
    //   selector: "phoneNumber",
    //   sortable: false,
    // },
    {
      name: "Currency",
      selector: "currency",
      sortable: false,
    },
    // {
    //   name: "Business Address",
    //   selector: "curbusinessAddressrency",
    //   sortable: false,
    // },
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
    // {
    //   name: "Shipping Address",
    //   selector: "shippingAddress",
    //   sortable: false,
    // },
    // {
    //   name: "Import Date",
    //   selector: "importDate",
    //   sortable: false,
    // },
    // {
    //   name: "Expiration Date",
    //   selector: "expirationDate",
    //   sortable: false,
    // },
    // {
    //   name: "Expired",
    //   selector: "expired",
    //   sortable: false,
    // },

    {
      name: "Edit",
      selector: "expired",
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
      cell: (product: Product) => (
        //         <a href={beginEditProduct(selectedProducts[0])} target="_blank" rel="noopener noreferrer">
        // 60				Download
        // 61			</a>
        <Link
          className="navbar-icon h-5 text-sm font-sans font-medium underline"
          to="#"
          onClick={() => {
            console.info("Edit product id = %s", product.id);
            // setSelectedProducts([product]);
            beginEditProduct(product);
          }}
        >
          Edit
        </Link>
        // <Button className=""
        //   raised
        //   primary
        //   onClick={() => beginEditProduct(selectedProducts[0])}
        // >
        //   Detail
        // </Button>
      ),
    },
    {
      name: "Delete",
      selector: "deleted",
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
      cell: (product: Product) => (
        //         <a href={beginEditProduct(selectedProducts[0])} target="_blank" rel="noopener noreferrer">
        // 60				Download
        // 61			</a>
        <Link
          className="navbar-icon h-5 text-sm font-sans font-medium underline"
          to="#"
          onClick={() => {
            console.info("Delete product id = %s", product.id);
          }}
        >
          Delete
        </Link>
        // <Button className=""
        //   raised
        //   primary
        //   onClick={() => beginEditProduct(selectedProducts[0])}
        // >
        //   Detail
        // </Button>
      ),
    },
  ];

  const onRowEdit = (htmlElement: HTMLAnchorElement) => { };
  const changeRowsPerPage = (
    currentRowsPerPage: number,
    currnetPage: number
  ) => {
    console.info(
      "Row per page currentRowsPerPage: %s, currnetPage: %s",
      currentRowsPerPage,
      currnetPage
    );
    setRowsPerPage(currentRowsPerPage);
  };

  const [rowsPerPage, setRowsPerPage] = useState(
    paginationRowsPerPageOptions[0]
  );

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = productList.products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div>
        <Link
          className="navbar-icon h-5 text-sm font-sans font-medium underline mr-5"
          to="#"
          onClick={() => {
            console.info("Add product");
            beginEditProduct(emptyProduct)
          }}
        >
          + Add Product
        </Link>
        <input className="border border-gray-700"
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-400">
      <ProductDetail />
      <div className="flex px-2 justify-between py-1">
        {/* <button
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-sm text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            beginEditProduct(emptyProduct);
          }}
        >
          Add Product
        </button> */}
      </div>
      <div className="w-full h-full">
        <DataTable
          fixedHeader={true}
          fixedHeaderScrollHeight="100"
          columns={columns}
          data={filteredItems}
          defaultSortField="id"
          sortIcon={<SortIcon />}
          pagination
          selectableRows={false}
          // onSelectedRowsChange={handleSelectedChange}
          customStyles={customStyles}
          striped={false}
          responsive={true}
          paginationTotalRows={productList.totalElements}
          highlightOnHover={true}
          onChangePage={pageChange}
          onChangeRowsPerPage={changeRowsPerPage}
          progressPending={loading}
          paginationServer={false}
          // onRowDoubleClicked={setSelectedProduct}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          selectableRowsHighlight={true}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          clearSelectedRows={
            editingProduct === null ||
            editingProduct === undefined ||
            editingProduct === emptyProduct
          }
        />
      </div>
    </div>
  );
};

export default Products;
