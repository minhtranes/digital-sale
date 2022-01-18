import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Product, emptyProduct } from "../components/inventory/product";
import http from "../repository/http-common";
import { productListActionCreators } from "../state";
import { ProductListActionNames } from "../state/action-types";

export const saveProduct = (p: Product): Product => {
  http.post<Product>(`/inventory/save`, p).then((r) => {
    return r.data;
  });
  return p;
};

// const dispatch = useDispatch();
// const { loadComplete } = bindActionCreators(
//   productListActionCreators,
//   dispatch
// );

export const listAll = (
  dispatch: Dispatch
): { content: Product[]; totalElements: number } => {
  http
    .get<{ content: Product[]; totalElements: number }>(`/inventory/list`)
    .then((r) => {
      console.info(r.data);
      dispatch({
        type: ProductListActionNames.PRODUCT_LIST_COMPLETE_LOADING,
        products: r.data.content,
        totalElements: r.data.totalElements,
      });
      return r.data;
    });
  return { content: [], totalElements: 0 };
};

export const getOne = (id: number): Product => {
  http.get<Product>(`/inventory/${id}`).then((r) => {
    return r.data;
  });
  return emptyProduct;
};
