import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
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
];

interface Product {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avarta: string;
}

type ProductList = Product[];

export const Products: FC = (Props) => {
  const [products, setProducts] = useState<ProductList>([]);

  useEffect(() => {
    axios.get<ProductList>("http://8gll4.mocklab.io/json/1").then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });
  }, []);

  return (
    <div className="product-table">
      <Card>
        <DataTable
          columns={columns}
          data={products}
          defaultSortField="id"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
        />
      </Card>
    </div>
  );
};
