import { AxiosResponse } from "axios";
import { Product } from "../components/inventory/product";
import http from "../repository/http-common";

export const saveProduct = (p: Product): Promise<AxiosResponse<Product>> => {
  return http.post(`/inventory/save`, p);
};

export const listAll = (
  page: number
): Promise<AxiosResponse<{ content: Product[]; totalElements: number }>> => {
  return http.get(`/inventory/list?page=` + page);
};

export const getOne = (id: number): Promise<AxiosResponse<Product>> => {
  return http.get(`/inventory/${id}`);
};
