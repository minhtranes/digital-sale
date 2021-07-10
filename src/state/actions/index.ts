import { Product } from "../../components/product/Product";
import { EditProductActionNames } from "../action-types";

interface EditProductBeginAction {
  type: EditProductActionNames.EDIT_PRODUCT_BEGIN;
  visible: boolean;
  product: Product;
}

interface EditProductEndAction {
  type: EditProductActionNames.EDIT_PRODUCT_SAVE;
  visible: boolean;
  product: Product;
}

interface EditProductAbortAction {
  type: EditProductActionNames.EDIT_PRODUCT_ABORT;
  visible: boolean;
}

export type EditProductAction =
  | EditProductBeginAction
  | EditProductEndAction
  | EditProductAbortAction;
