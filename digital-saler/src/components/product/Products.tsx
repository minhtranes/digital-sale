import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import React, { FC } from "react";
import DataTable from "react-data-table-component";
import products from "./ProductData";

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Directior",
    selector: "director",
    sortable: true,
  },
  {
    name: "Runtime (m)",
    selector: "runtime",
    sortable: true,
    right: true,
  },
];

export const Products: FC = () => {
  return (
    <div className="product-table">
      <Card>
        <DataTable
          title="Inventory"
          columns={columns}
          data={products}
          defaultSortField="title"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
        />
      </Card>
    </div>
  );
};
