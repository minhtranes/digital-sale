import SortIcon from "@material-ui/icons/ArrowDownward";
import { FC, useEffect, useState } from "react";
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
];
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

const Products: FC = (Props) => {
  const productList = useSelector((state: RootState) => {
    console.info("Product list updated");
    console.info(state.productList.products);
    return state.productList;
  });
  const editingProduct = useSelector((state: RootState) => {
    return state.editingProduct.product;
  });

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([
    emptyProduct,
  ]);

  const handleSelectedChange = (s: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Product[];
  }) => {
    console.info("handleSelectedChange");
    setSelectedProducts(s.selectedRows);
  };

  const [paginationPerPage, setPaginationPerPage] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    listAll(0).then((r) => {
      console.info(r.data);
      loadComplete(r.data.content, r.data.totalElements);
      setLoading(false);
    });
  }, []);

  const handlePageChange = (page: number) => {
    setLoading(true);

    console.log("Page change to " + page);

    setLoading(false);
  };

  const dispatch = useDispatch();
  const { updateProducts, removeProducts, loadComplete } = bindActionCreators(
    productListActionCreators,
    dispatch
  );

  const { saveEditProduct, editProduct, abortEditProduct, beginEditProduct } =
    bindActionCreators(actionCreators, dispatch);

  return (
    <div className="flex flex-col h-full w-full bg-gray-400">
      <ProductDetail />
      <div className="flex px-2 justify-between py-1">
        <button
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-sm text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            beginEditProduct(selectedProducts[0]);
          }}
        >
          Add Product
        </button>
      </div>
      <div className="w-full h-full">
        <DataTable
          fixedHeader={true}
          fixedHeaderScrollHeight="100"
          columns={columns}
          data={productList.products}
          defaultSortField="id"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
          onSelectedRowsChange={handleSelectedChange}
          customStyles={customStyles}
          striped={false}
          responsive={true}
          paginationTotalRows={productList.totalElements}
          highlightOnHover={true}
          onChangePage={handlePageChange}
          progressPending={loading}
          paginationPerPage={paginationPerPage}
          // onRowDoubleClicked={setSelectedProduct}
          selectableRowsHighlight={true}
          paginationRowsPerPageOptions={[10, 15]}
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
