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

export const removeProducts = (removedProducts: Product[]) => {
  return (dispatch: Dispatch<ProductListAction>) => {
    console.info("Removing products");
    dispatch({
      type: ProductListActionNames.PRODUCT_LIST_REMOVE_ELEMENTS,
      removedProducts: removedProducts,
    });
  };
};

export const updateProducts = (updatedProducts: Product[]) => {
  return (dispatch: Dispatch<ProductListAction>) => {
    console.info("Updating products");
    dispatch({
      type: ProductListActionNames.PRODUCT_LIST_UPDATE_ELEMENTS,
      updatedProducts: updatedProducts,
    });
  };
};
