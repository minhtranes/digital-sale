import { Dispatch } from "redux";
import { Product } from "../../components/product/Product";
import { EditProductActionNames } from "../action-types";
import { EditProductAction } from "../actions/index";

/**
 * This makes detail window visible to user to start edit a given product
 * This includes clone the product into a temporary for editing
 * @param product The product need to be shown the detail for editing
 * @returns
 */
export const beginEditProduct = (product: Product) => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Begin editing product {}", product.idString);
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_BEGIN,
      visible: true,
      product: product,
    });
  };
};

/**
 * Accept the edited product and merge the main one
 * @param product
 * @returns
 */
export const saveEditProduct = (product: Product) => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Save editing product {}", product.idString);
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_SAVE,
      visible: false,
      product: product,
    });
  };
};

/**
 * Edit a given field with value
 * @param field
 * @param value
 * @returns
 */
export const editProduct = (field: string, value: any) => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Edit product field " + field);
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_EDIT,
      field: field,
      value: value,
    });
  };
};

/**
 * This aborts the editing and ignore the temporary product
 * @returns
 */
export const abortEditProduct = () => {
  return (dispatch: Dispatch<EditProductAction>) => {
    console.info("Abort editing product");
    dispatch({
      type: EditProductActionNames.EDIT_PRODUCT_ABORT,
      visible: false,
    });
  };
};
