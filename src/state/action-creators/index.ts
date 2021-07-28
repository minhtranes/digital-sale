import { Dispatch } from "redux";
import { Product } from "../../components/product/Product";
import { EditProductActionNames } from "../action-types";
import { EditProductAction } from "../actions/index";

export const beginEditProduct = (product: Product) => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Begin editing product");
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_BEGIN,
      visible: true,
      product: product,
    });
  };
};

export const endEditProduct = (product: Product) => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Save editing product");
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_SAVE,
      visible: false,
      product: product,
    });
  };
};

export const abortEditProduct = () => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Abort editing product");
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_ABORT,
      visible: false,
    });
  };
};
