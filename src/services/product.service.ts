import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Product, emptyProduct } from "../components/inventory/product";
import http from "../repository/http-common";
import { productListActionCreators } from "../state";
import {
  loadComplete,
  updateProducts,
} from "../state/action-creators/productListActionCreators";
import {
  EditProductActionNames,
  ProductListActionNames,
} from "../state/action-types";

export const saveProduct = (p: Product, dispatch: Dispatch): Product => {
  http.post<Product>(`/inventory/save`, p).then((r) => {
    dispatch({
      type: ProductListActionNames.PRODUCT_LIST_UPDATE_ELEMENTS,
      updatedProducts: [r.data],
    });
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_SAVE,
      visible: false,
      product: r.data,
    });
    return r;
  });
  return p;
};

// const dispatch = useDispatch();
// const { loadComplete } = bindActionCreators(
//   productListActionCreators,
//   dispatch
// );

export const listAll = (
  page: number,
  dispatch: Dispatch
): { content: Product[]; totalElements: number } => {
  http
    .get<{ content: Product[]; totalElements: number }>(
      `/inventory/list?page=` + page
    )
    .then((r) => {
      console.info(r.data);
      // loadComplete(r.data.content, r.data.totalElements);
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
