import { Product, emptyProduct } from "../components/inventory/product";
import http from "../repository/http-common";

export const saveProduct = (p: Product): Product => {
  http.post<Product>(`/inventory/save`, p).then((r) => {
    return r.data;
  });
  return p;
};

export const listAll = () => {
  http.get<Product[]>(`/inventory/list`).then((r) => {
    return r.data;
  });
  return null;
};

export const getOne = (id: number): Product => {
  http.get<Product>(`/inventory/${id}`).then((r) => {
    return r.data;
  });
  return emptyProduct;
};
