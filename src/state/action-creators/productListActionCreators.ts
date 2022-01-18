import { Dispatch } from "redux";
import { Product } from "../../components/inventory/product";
import { ProductListActionNames } from "../action-types";
import { ProductListAction } from "../actions/productListActions";

export const loadComplete = (products: Product[], totalElements: number) => {
  return (dispatch: Dispatch<ProductListAction>) => {
    console.info("Complete loading products");
    dispatch({
      type: ProductListActionNames.PRODUCT_LIST_COMPLETE_LOADING,
      products: products,
      totalElements: totalElements,
    });
  };
};
